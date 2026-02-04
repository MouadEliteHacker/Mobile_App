import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import colors from '../col'

const Saved = () => {
  return (
    <View style={{flex: 1, backgroundColor:colors.primary}}>
      <Image
        source={images.bg}
        style={{position: 'absolute', width: '100%', zIndex:0}}
        resizeMode="cover"
      />
    </View>
  )
}

export default Saved