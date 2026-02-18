import weaviate
from typing import List, Dict
import json

def load_movies_from_json(filepath: str = "data/movies_data.json") -> List[Dict]:
    with open(filepath, 'r', encoding = 'utf-8') as f: 
        return json.load(f)
    
def add_movie_to_weaviate(client, movie:Dict):


    movies = client.collections.get("Movie")

    genres = [g["name"] for g in movie.get("genres", [])]

    uuid = movies.data.insert( properties = {
            "movieId": movie["id"],
            "title": movie["title"],
            "originalTitle": movie.get("original_title", ""),
            "overview": movie.get("overview", ""),
            "originalLanguage": movie.get("original_language", ""),
            "releaseDate": movie.get("release_date", ""),
            "popularity": movie.get("popularity", 0),
            "voteAverage": movie.get("vote_average", 0),
            "voteCount": movie.get("vote_count", 0),
            "posterPath": movie.get("poster_path", ""),
            "video": movie.get("video", False),
            "adult": movie.get("adult", False), 
            "genres": genres,
            "backdropPath": movie.get("backdrop_path", ""), } 
    )
    return uuid

def batch_add_movies_from_json(client, filepath):
    
    movies = load_movies_from_json(filepath)
    
    added = 0
    skipped = 0
    
    for movie in movies:
        try:
            result = add_movie_to_weaviate(client, movie)
            if result:
                added += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"✗ Failed: {movie.get('title', 'Unknown')} - {e}")

