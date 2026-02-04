import {Client, Databases, ID, Query} from "react-native-appwrite"


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID!;

const client  = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => { 
    try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('title', movie.title)
    ])


    if (result.documents.length > 0 ){ 
        const existingMovie = result.documents[0];


        await database.updateDocument(
            DATABASE_ID, 
            COLLECTION_ID, 
            existingMovie.$id, 
            {
                count: existingMovie.count + 1
            }
        )
    }
    else { 
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchterm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
    console.log(result)

    // check if a record of that search has alrewady been found
}
catch (err){
    console.log(err)
    throw err
    
}}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined >  => { 
    try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.limit(7),
        Query.orderDesc('count')
    ])
    return result.documents as unknown as TrendingMovie[];
} catch (err){
        console.log(err)
        return undefined;
    }}


    export const saveMovie = async(id: number, title: string) => {
        try{

            // const result = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID!, [
            //     Query.equal('id', id)
            // ])
            await database.createDocument(DATABASE_ID, SAVED_COLLECTION_ID, ID.unique(), {
                id: id, 
                title: title
            }

            )

        }
        catch (err) {
            console.log(err)
            throw err;
        }
    }

    export const deleteMovie = async(id: number) => {
        try{

            const result = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID!, [
            Query.equal('id', id)
            ])
            if(result){
                await database.deleteDocument(DATABASE_ID, SAVED_COLLECTION_ID, result.documents[0].$id
            )
            }
            
            

        }
        catch (err) {
            console.log(err)
            throw err;
        }
    }

    export const isSaved = async(id: number) : Promise<boolean> => {
        try {
            const result = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID!, [
                Query.equal('id', id)
            ])

            return result.documents.length > 0;
            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    
