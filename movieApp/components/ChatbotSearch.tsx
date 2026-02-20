import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onSubmit?: () => void;
}

const ChatbotSearch = ({ placeholder, onSubmit, onChangeText, value }: Props) => {
    return (
        <View style={styles.view}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                placeholderTextColor="#a8b5db"
                multiline={false}
                returnKeyType="send"
                onSubmitEditing={onSubmit}
            />
            <TouchableOpacity onPress={onSubmit} style={styles.button}>
                <Image source={icons.arrow} tintColor='white' resizeMode='contain' style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

export default ChatbotSearch

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a3e',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ab8bff',
        marginHorizontal: 16,
        marginBottom: 100, 
    },
    input: {
        color: 'white',
        flex: 1,
        fontSize: 14,
        paddingVertical: 4,
    },
    button: {
        backgroundColor: '#ab8bff',
        borderRadius: 20,
        padding: 8,
        marginLeft: 8,
    },
    icon: {
        height: 16,
        width: 16,
    }
})