from src.weaviate_config import init_weaviate_client, create_movie_schema
from src.weaviate_operations import batch_add_movies_from_json
import time

def setup_weaviate():
    
    print("Initializing Weaviate client...")
    client = init_weaviate_client()

    time.sleep(30)
    

    if client.collections.exists("Movie"):
        print("🗑️  Deleting old Movie collection...")
        client.collections.delete("Movie")

    print("Creating Movie schema...")
    create_movie_schema(client)
    
    print("Loading movies from JSON and adding to Weaviate...")
    batch_add_movies_from_json(client, filepath="data/movies_data.json")
    
    print("\n Setup complete!")
    client.close()

if __name__ == "__main__":
    setup_weaviate()