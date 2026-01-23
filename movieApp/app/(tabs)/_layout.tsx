import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { ImageBackground } from 'expo-image'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import colors from '../col'

const TabIcon = ({focused, icon, title} : any) => {
    if(focused){
    return(
    <ImageBackground  source = {images.highlight} style = {styles.imageBG}>
         <Image source ={icon}  tintColor = '#151312'/>
         <Text>{title}</Text>
    </ImageBackground>
     )}
    return (
        <View style = {{flex: 1,justifyContent:"center", alignItems: "center", 
        marginTop: 4, borderRadius: '30%'}}> 
            <Image source= {icon} tintColor='#A8B5DB' />
        </View>
    )

}

const _layout = () => {
  return (
    <Tabs screenOptions={
        {
            tabBarShowLabel: false, 
            tabBarItemStyle: { 
                width : '100%', 
                height: '100%', 
                justifyContent: 'center', 
                alignItems: 'center'
            }, 
            tabBarStyle: { 
                backgroundColor: '#0f0D23', 
                borderRadius: 50, 
                marginHorizontal: 20, 
                marginBottom: 36, 
                height: 52, 
                position: 'absolute', 
                overflow: 'hidden', 
                borderWidth: 1, 
                borderColor: '#0f0d23'
            }
        }
    }>
        <Tabs.Screen
        name = "index"
        options = {{
            title :'Home', 
            headerShown: false, 
            tabBarIcon: ({ focused }) => (
                    <TabIcon
                    focused = {focused} icon = {icons.home} title ="Home" />
            )
        }}
        />
        <Tabs.Screen
        name = "search"
        options = {{
            title :'Search', 
            headerShown: false, 
            tabBarIcon: ({focused}) => (
                <TabIcon
                    focused = {focused} icon = {icons.search} title ="Search" />
            )
        }}
        />
        <Tabs.Screen
        name = "saved"
        options = {{
            title :'Saved', 
            headerShown: false, 
            tabBarIcon: ({focused}) => (
                <TabIcon
                    focused = {focused} icon = {icons.save} title ="Saved" />
            )
        }}
        />
        <Tabs.Screen
        name = "profile"
        options = {{
            title :'Profile', 
            headerShown: false, 
            tabBarIcon: ({focused}) => (
                <TabIcon
                    focused = {focused} icon = {icons.person} title ="Profile" />
            )
        }}
        />
        

    </Tabs>
  )
}


const styles = StyleSheet.create({
    imageBG : {
        display: "flex", flexDirection: "row", width:'100%', flex: 1, minWidth: 100, minHeight: 55, 
        marginTop:16 ,justifyContent: "center", alignItems: "center", borderRadius: 50 , overflow: "hidden",
    },
    image: { 

    }, 
    text:{
        color: colors.secondary, fontWeight: 600, fontSize: 16, lineHeight: 24
    }
})

export default _layout