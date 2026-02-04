import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../col'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { icons } from '@/constants/icons'
import { saveMovie, deleteMovie, isSaved } from '@/services/appwrite'

interface MovieInfoProps {

    label: string;
    value?: string | null | number;
}

const MovieInfo = ({ label, value} : MovieInfoProps ) => (

    <View style= {{flexDirection: 'column', alignItems: 'flex-start', 
        justifyContent: 'center', marginTop: 20
    }}>
        <Text style= {{color: colors.light[200], fontWeight: 'bold', fontStyle: 'normal'}}>
            {label}
        </Text>
        <Text style= {{color: 'white', fontWeight: 'bold', marginTop: 8}}>
            {value  || "N/A"}
        </Text>

    </View>
)

const MovieDetails = () => {

    const { id} = useLocalSearchParams();
    
    const [starState, setStarState] = useState(icons.emptyStar)

    const { data: movie, loading} = useFetch(() => fetchMovieDetails(id as string))
    
    useEffect(() => {
    const checkIfSaved = async () => {
        if (movie?.id) {
            const saved = await isSaved(movie.id);
            setStarState(saved ? icons.favorite : icons.emptyStar);
        }
    };
    
    checkIfSaved();
}, [movie?.id]);

    useEffect(() => {
        if(!movie?.id)return;
        if(starState === icons.favorite && movie?.id){
            saveMovie(movie?.id , movie?.title);
        }
        else if (movie){
            deleteMovie(movie?.id)
        }
    }, [starState])

    if (loading){
        return(
            <SafeAreaView>
                <ActivityIndicator/>
            </SafeAreaView>
        )
    }

    
  return (
    <View style= {styles.view}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
          
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            style= {{ height: 500, width: '100%',}}
            
            // tintColor={colors.dark[200]}
            resizeMode="stretch"
          />
          </View>

          <View style= {{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', 
            marginTop: 5, paddingHorizontal: 5
          }}>
            <Text style= {{color: 'white', fontWeight: 'bold', fontSize: 24}}> 
                {movie?.title}
            </Text>
            <View style= {{flexDirection: 'row', alignItems: 'center', rowGap: 4, marginTop: 8,
                backgroundColor: colors.dark[100], padding: 4, borderRadius: 10
            }}>
                <Image 
                source={icons.star}
                style ={{width: 20, height: 20}} />
                <Text style= {{color: 'white', fontSize: 18, marginLeft: 6, fontWeight: 'bold'}}>
                    {Math.round(movie?.vote_average || 0)}/10
                </Text>
            </View>

            <MovieInfo 
            label='Overview'
            value={movie?.overview}
            />

            <MovieInfo 
            label='Genres'
            value={movie?.genres?.map((g) => g.name).join(' - ')}
            />

            <MovieInfo 
            label='Budget'
            value={`${(movie?.budget  || 0) /1000000} million`}
            />

            

          </View>
       </ScrollView>  
       <View
        style= {{position: 'absolute', bottom: 20, left : 4, right:4, 
             display: 'flex', flexDirection: 'row',  zIndex: 50, gap: 10, 
        }}>
        <TouchableOpacity style= {styles.touchable}
        onPress={router.back}>
            <Image
          source={icons.arrow}
          style={{ transform: [{ rotate: "180deg" }], marginRight: 4, marginTop: 2, height: 20, width: 20 }}

          tintColor="#fff"
        />
        <Text
        style={{color:'white', fontWeight: 'condensedBold'}}>Go Back</Text></TouchableOpacity>
        <TouchableOpacity style= {styles.touchable}
        onPress={() => setStarState(
                    starState === icons.emptyStar ? icons.favorite : icons.emptyStar
                  )}>
            <Image
          source={starState}
          style={{  marginRight: 4, marginTop: 2, height: 16, width: 16 }}

          tintColor="#fff"
        />
        <Text
        style={{color:'white', fontWeight: 'condensedBold'}}>Save Movie</Text></TouchableOpacity>
        
        
      </View>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.primary, flex: 1
    }, 
    touchable: {
        display: 'flex', flexDirection: 'row',alignItems: 'center', 
            justifyContent: 'center', flex: 1, padding: 8,
            backgroundColor:colors.accent, borderRadius: 8,
    }
})