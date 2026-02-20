from flask import Flask, request, jsonify
from src.rag_chatbot import create_rag_response
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    query = data.get('query', '')
    
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    
    response = create_rag_response(query)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host=os.getenv("IP_ADRESS"), port=5000, debug=True)