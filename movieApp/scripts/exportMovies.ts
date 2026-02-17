import * as fs from 'fs';
import * as path from 'path';

// TMDB config 
const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjA1MjZhYjZiMGI3NjczMzVmYmY2NjAyMmNhMWU5MSIsIm5iZiI6MTc2ODY4NjcwMi41NDQsInN1YiI6IjY5NmMwNDZlZWVlN2U0YmU5M2FhYTQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xlvI8OtARofJwtAC1JrmDZ6dvBbxmfJSUFLFz99Ljjo",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjA1MjZhYjZiMGI3NjczMzVmYmY2NjAyMmNhMWU5MSIsIm5iZiI6MTc2ODY4NjcwMi41NDQsInN1YiI6IjY5NmMwNDZlZWVlN2U0YmU5M2FhYTQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xlvI8OtARofJwtAC1JrmDZ6dvBbxmfJSUFLFz99Ljjo`,
  },
};

// fetch functions 
async function fetchMovies(page: number = 1) {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
}

async function fetchMovieDetails(movieId: string) {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${movieId}`,
    {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }

  return await response.json();
}

async function exportMoviesToJSON() {
  console.log('Starting movie export...\n');
  
  const allMovies = [];
  const totalPages = 25; // 500 movies
  
  for (let page = 1; page <= totalPages; page++) {
    try {
      const movies = await fetchMovies(page);
      allMovies.push(...movies);
      console.log(`Page ${page}/${totalPages}: ${movies.length} movies`);
      
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed page ${page}:`, error);
    }
  }

  console.log(`\n Fetched ${allMovies.length} movies\n`);
  console.log('Fetching detailed information...\n');

  const detailedMovies = [];
  for (let i = 0; i < allMovies.length; i++) {
    try {
      const details = await fetchMovieDetails(allMovies[i].id.toString());
      detailedMovies.push(details);
      
      if ((i + 1) % 10 === 0 || i === allMovies.length - 1) {
        console.log(`   ${i + 1}/${allMovies.length} completed`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 250));
    } catch (error) {
      console.error(`Failed: ${allMovies[i].title || 'Unknown'}`);
    }
  }

  const outputPath = path.join(__dirname, '../../rag_chatbot/data/movies_data.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(detailedMovies, null, 2));
  
  console.log(`\nExported ${detailedMovies.length} movies to:`);
  console.log(`   ${outputPath}`);
}

exportMoviesToJSON().catch(console.error);