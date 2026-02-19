from groq import Groq
import os
from dotenv import load_dotenv
from .weaviate_config import init_weaviate_client
from .weaviate_operations import hybrid_search

load_dotenv()

def create_rag_response(user_query: str) -> str:
    
    # Retrieve
    print("Searching for relevant movies...")
    client = init_weaviate_client()
    movies = hybrid_search(client, user_query, limit=5, alpha=0.5)
    client.close()
    
    if not movies:
        return "I couldn't find any relevant movies. Try rephrasing!"
    
    # Prompt augmentationn
    context = "\n\n".join([
        f"**{m['title']}** ({m['releaseDate'][:4] if m.get('releaseDate') else 'N/A'})\n"
        f"Rating: {m.get('voteAverage', 'N/A')}/10 ({m.get('voteCount', 0)} votes)\n"
        f"Genres: {', '.join(m.get('genres', []))}\n"
        f"Overview: {m.get('overview', 'No overview available')}"
        for m in movies
    ])
    
    # Generation 
    print("Generating response with Groq...")
    
    groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    prompt = f"""You are a helpful movie recommendation assistant. Based on the following movies from the database, answer the user's question.

            RELEVANT MOVIES:
            {context}

            USER QUESTION: {user_query}

            Use markdown to format the output:
            Use bold for movie titles
            use bulllet points for lists 

            Provide personalized recommendations with very brief explanations. Be conversational, enthusiastic, and helpful."""

    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",  
        messages=[
            {"role": "system", "content": "You are a helpful movie recommendation assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1000,
        temperature=0.7
    )
    
    return response.choices[0].message.content

def main():
    """Interactive chatbot loop"""
    print("\n" + "="*50)
    print("MOVIE RECOMMENDATION CHATBOT")
    print("="*50)
    print("\nPowered by Groq AI")
    print("Type 'exit' or 'quit' to end.\n")
    
    while True:
        try:
            user_input = input("You: ").strip()
            
            if user_input.lower() in ["exit", "quit", "q"]:
                print("\nThanks for chatting!")
                break
            
            if not user_input:
                continue
            
            response = create_rag_response(user_input)
            print(f"\nAssistant: {response}\n")
            
        except KeyboardInterrupt:
            print("\n\nThanks for chatting!")
            break
        except Exception as e:
            print(f"\nError: {e}\n")

if __name__ == "__main__":
    main()