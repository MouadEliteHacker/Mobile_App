import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons';
import colors from '@/app/col';

const MovieCard = ({id, poster_path, title, vote_average, release_date, popularity}: Movie) => {
    // const arrows = popularity/maxPopularity * 10 / 2
    const stars = Math.round(vote_average/2); 
    return ( 
    
    <Link href ={`/movies/${id}`} asChild>
        <TouchableOpacity style= {{width:'30%'}}>
            
            <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          style= {{width: '100%', height: 190, borderRadius: 12}}
          resizeMode="cover"
        />

        <Text style= {{fontWeight: 'bold', color: 'white', marginTop: 5, fontSize: 14}} numberOfLines={1}>
          {title}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {Array.from({ length: stars }).map((_, index) => (
        <Image
          key={index}
          source={icons.star}
          style={{ width: 16, height: 16 }}
        />
      ))}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style= {{fontWeight:'medium', color: colors.light[300] , marginTop: 2, fontSize: 12}}>{release_date?.split('-')[0]}</Text>
        </View>

         </TouchableOpacity>
    </Link>
  )
}

export default MovieCard

const styles = StyleSheet.create({

    text: {
        color: 'white'
    }
})