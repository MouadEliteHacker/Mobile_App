import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch"
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { useState } from "react";


export default function Index() {
  const router  = useRouter();

  const[searchQuery, setSearchQuery] = useState('');

  const { data: movies, loading: moviesLoading, 
    error: moviesError} = useFetch(() => fetchMovies({ query: ''}))
    const maxPopularity = movies? movies[0].popularity: 2000;
  return (
    <View style={styles.view}>
      <Image source={images.bg} style = {styles.image} />
      <ScrollView style = {styles.scroll} showsVerticalScrollIndicator = {false}
      contentContainerStyle = {{minHeight: '100%', paddingBottom: 10
      }} >
        <Image source={icons.logo} style = {styles.logo} />

        {moviesLoading? (
          <ActivityIndicator
          size="large"
          color = "#0000ff"
          style = {{marginTop: 10, alignSelf: "center"}}
          
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message} </Text>
        ) : (
        <View style={{flex: 1, marginTop: 13}}> 
          <SearchBar onPress = {() => router.push("/search")}
            placeholder='Search Movies ...' 
            value= {searchQuery}
            onChangeText = {(text: string) => setSearchQuery(text)}   />

          <>
            <Text  style = {{
              color: 'white', fontStyle: 'normal', fontSize: 22, marginTop: 12, marginBottom: 9
            }}>Latest Movies</Text>

            <FlatList 
                    data={movies}
                    renderItem={({item}) => (

                      <MovieCard  
                        { ... item}
                        
                      />
                      
                    )}     
                    keyExtractor={(item) => item.id.toString()}  
                    numColumns={3} 
                    columnWrapperStyle = {{
                      justifyContent: 'flex-start', 
                      gap: 20, 
                      paddingRight: 5, marginBottom: 10
                    }}
                    style = {{marginTop: 5, paddingBottom: 70}}
                    scrollEnabled= {false}
            />
          </>
        </View>
        )
        }
        
      

        
      </ScrollView>
    </View>
  );
}

const primary = '#030014';
const accent = '#AB8BFF';
const secondary = '#111312';
const light = { 100 : '#D6C6FF', 200 : '#A8B5DB', 300 : '#9CA4AB'}
const dark  = { 100 : '#221f3d', 200 : '#0f0d23'}
const styles = StyleSheet.create({
  
  view : {
    flex:1, 
    backgroundColor: primary
  }, text: { 
    color :dark[200], fontSize: 48
  },
  image: {
    width: '100%', position: 'absolute', zIndex: 0
  }, 
  scroll: {
    flex: 1, 
    paddingHorizontal: 5, 
  }, logo :{
    width: 42, height: 40, marginTop: 50, marginBottom: 5, marginHorizontal: 'auto'
  }
})