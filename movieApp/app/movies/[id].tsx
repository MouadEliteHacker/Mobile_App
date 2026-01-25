import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../col'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { icons } from '@/constants/icons'

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
    console.log(id.valueOf)

    const { data: movie, loading} = useFetch(() => fetchMovieDetails(id as string))

    console.log(movie?.poster_path)
  return (
    <View style= {styles.view}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
          
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            style= {{ height: 500, width: '100%', }}
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
       <TouchableOpacity
        style= {{position: 'absolute', bottom: 20, left : 0, right:0, backgroundColor:colors.accent, borderRadius: 8, 
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          style={{ transform: [{ rotate: "180deg" }], marginRight: 4, marginTop: 2, height: 20, width: 20 }}

          tintColor="#fff"
        />
        <Text
        style={{color:'white', fontWeight: 'condensedBold'}}>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.primary, flex: 1
    }
})