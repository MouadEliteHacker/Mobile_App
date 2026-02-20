import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../app/col.js'
import { icons } from '@/constants/icons'

interface Props{ 
    placeholder:string;
    value?: string, 
    onChangeText?: (text: string) => void;
    onPress?: ()=> void;
}

const SearchBar = ({placeholder, onPress , onChangeText, value}: Props) => {
  return (
    <View style={styles.view}>
      <Image source={icons.search} tintColor='#ab8bff' resizeMode='contain' />
      <TextInput 
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style = {styles.image}
        placeholderTextColor="#a8b5db"
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    view:{
        flexDirection: 'row', alignItems: 'center', backgroundColor: colors.dark[200], 
        paddingVertical: 14, paddingHorizontal: 5, borderRadius: 50, marginTop: 10
    }, image: {
        color: 'white'
    }
})