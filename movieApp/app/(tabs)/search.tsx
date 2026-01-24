import { StyleSheet, View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../col'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import useFetch from "@/services/useFetch"
import { fetchMovies } from "@/services/api";
import {updateSearchCount} from "@/services/appwrite";
import MovieCard from "@/components/MovieCard";
import SearchBar from '@/components/SearchBar'

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const { data: movies = [], loading, 
    error , refetch: loadMovies, reset} = useFetch(() => fetchMovies({ query: searchQuery}), false)

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
          if(searchQuery.trim()){
            await loadMovies()
            
        }
          
          else{
            reset();
          }

    }, 500)

    return () => clearTimeout(timeoutId);
    
  
  }, [searchQuery]);

    useEffect(() => {
          if (searchQuery.trim() && movies?.length! > 0 && movies?.[0]) {
                updateSearchCount(searchQuery, movies[0]);
        } }, [movies])
  
  return (
    <View style= {styles.view}>
      <Image source={images.bg} style = {styles.image} resizeMode='cover'/>
      
      <FlatList
      style= {{paddingHorizontal: 10}}
      data = {movies} 
      renderItem={({item}) => <MovieCard 
      {...item} />} 
      keyExtractor = {(item) => item.id.toString()}
      numColumns={3} 
      columnWrapperStyle = {{
                      justifyContent: 'center', 
                      gap: 16, 
                      paddingRight: 5, marginVertical: 16
                    }}
      contentContainerStyle = {{marginTop: 5, paddingBottom: 100}}
      ListHeaderComponent={
        <>
          <View style= {{width:'100%', flexDirection: 'row', 
          justifyContent: 'center', marginTop: 20, alignItems: 'center'}}>

            <Image   source={icons.logo} style= {{ width: 35, height : 40, }}/>
          </View>
          <View style= {{marginVertical: 5}}>

            <SearchBar  placeholder='Search Movies ...' 
            value= {searchQuery}
            onChangeText = {(text: string) => setSearchQuery(text)}   />
          </View>
          {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style= {{marginVertical: 3}}
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length! > 0 && (
              <Text style= {{fontSize: 24, color: 'white', fontWeight: 'bold'}}> 
                Search results for {' '}
                <Text style= {{ color : colors.accent}}>{searchQuery}</Text>
              </Text>
            )}
        </>


      }
      ListEmptyComponent={
        !loading && !error ? (
          <View style= {{marginTop: 20, paddingHorizontal: 10}}>
            <Text  style= {{textAlign: 'center', color: colors.light[300]}}>
              {searchQuery.trim() ? 'No movies found' : 'Search for a movie '}
            </Text>
          </View>
        ): null
      }
      />
     
    </View>
  )
}

const styles = StyleSheet.create({
  view : {
    flex: 1, 
    backgroundColor: colors.primary, 

  }, 
  image: {
    width: '100%', position: 'absolute', zIndex: 0
  }, 
})

export default Search