import { fetchMovies, fetchMovieDetails } from "@/services/api";
import * as fs from 'fs';
import * as path from 'path';

async function exportMoviesToJSON() {
  console.log('Starting movie export...\n');
  
  // Fetch multiple 20 pages 
  const allMovies = [];
  const totalPages = 5; // 100 movies
  
  for (let page = 1; page <= totalPages; page++) {
    try {
      const movies = await fetchMovies({ query: '' }); // Gets top 20 
      allMovies.push(...movies);
      console.log(`📄 Page ${page}/${totalPages}: ${movies.length} movies`);
      
      // Small delay between pages 
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to fetch page ${page}:`, error);
    }
  }

  console.log(`\n Fetched ${allMovies.length} movies\n`);
  console.log(' Fetching detailed information...\n');

  // Fetch full details for each movie
  const detailedMovies = [];
  for (let i = 0; i < allMovies.length; i++) {
    try {
      const details = await fetchMovieDetails(allMovies[i].id.toString());
      detailedMovies.push(details);
      
      // Progress indicator
      if ((i + 1) % 10 === 0 || i === allMovies.length - 1) {
        console.log(`   ${i + 1}/${allMovies.length} completed`);
      }
      
      // Delay 
      await new Promise(resolve => setTimeout(resolve, 250));
    } catch (error) {
      console.error(`Failed: ${allMovies[i].title}`, error);
    }
  }

  // Save to JSON
  const outputPath = path.join(__dirname, '../../rag-chatbot/data/movies_data.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(detailedMovies, null, 2));
  
  console.log(`\n✅ Exported ${detailedMovies.length} movies to:`);
  console.log(`   ${outputPath}`);
}

exportMoviesToJSON().catch(console.error);

