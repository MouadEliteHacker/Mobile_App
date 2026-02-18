import weaviate
from weaviate.classes.config import Configure, Property, DataType
from weaviate.classes.init import AdditionalConfig, Timeout

from dotenv import load_dotenv

load_dotenv()

def init_weaviate_client():
    client = weaviate.connect_to_local(
        host="localhost",
        port=8080, 
        skip_init_checks=True, 
        additional_config=AdditionalConfig(
            timeout=Timeout(init=60, query=60, insert=120))
    )
    return client

def create_movie_schema(client):
    if client.collections.exists("Movie"):
        print("Movie collection already exists")
        return
    
    client.collections.create(
        name="Movie",
        description="Movies from TMDB database",
        vectorizer_config=Configure.Vectorizer.text2vec_transformers(),
        properties=[
            Property(name="movieId", data_type=DataType.INT),
            Property(name="title", data_type=DataType.TEXT),
            Property(name="originalTitle", data_type=DataType.TEXT),
            Property(name="overview", data_type=DataType.TEXT),
            Property(name="originalLanguage", data_type=DataType.TEXT),
            Property(name="releaseDate", data_type=DataType.TEXT),
            Property(name="popularity", data_type=DataType.NUMBER),
            Property(name="voteAverage", data_type=DataType.NUMBER),
            Property(name="voteCount", data_type=DataType.INT),
            Property(name="posterPath", data_type=DataType.TEXT),
            Property(name="video", data_type=DataType.BOOL),
            Property(name="adult", data_type=DataType.BOOL),
            Property(name="genres", data_type=DataType.TEXT_ARRAY),
            Property(name="backdropPath", data_type=DataType.TEXT),
        ]
    )
    
    print("Movie Collection created successfully")