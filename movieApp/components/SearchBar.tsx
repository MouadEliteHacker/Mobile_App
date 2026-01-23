import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../app/col.js'
import { icons } from '@/constants/icons'

interface Props{ 
    placeholder:string;
    onPress?: ()=> void;
    value: string, 
    onChangeText: (text: string) => void;
}

const SearchBar = ({placeholder, onPress, value, onChangeText}: Props) => {
  return (
    <View style={styles.view}>
      <Image source={icons.search} tintColor='#ab8bff' resizeMode='contain' />
      <TextInput 
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        style = {styles.image}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    view:{
        flexDirection: 'row', alignItems: 'center', backgroundColor: colors.dark[200], 
        paddingVertical: 4, paddingHorizontal: 5, borderRadius: 50, 
    }, image: {
        color: 'white'
    }
})