import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Markdown from 'react-native-markdown-display'

interface Props {
    text: string;
    isBot: boolean;
}

const ConvoCard = ({ text, isBot }: Props) => {
    return (
        <View style={[styles.container, isBot ? styles.botContainer : styles.userContainer]}>
            <View style={[styles.bubble, isBot ? styles.botBubble : styles.userBubble]}>
                 {isBot ? (
                    <Markdown style={markdownStyles}>{text}</Markdown>
                ) : (
                    <Text style={styles.text}>{text}</Text>
                )}
                
            </View>
        </View>
    )
}


export default ConvoCard


const markdownStyles = StyleSheet.create({
    body: { color: 'white', fontSize: 14 },
    strong: { color: '#ab8bff', fontWeight: 'bold' },
    bullet_list: { color: 'white' },
})

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        marginVertical: 4,
    },
    botContainer: {
        alignItems: 'flex-start',
    },
    userContainer: {
        alignItems: 'flex-end',
    },
    bubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 18,
    },
    botBubble: {
        backgroundColor: '#1a1a3e',
        borderWidth: 1,
        borderColor: '#ab8bff',
        borderBottomLeftRadius: 4,
    },
    userBubble: {
        backgroundColor: '#ab8bff',
        borderBottomRightRadius: 4,
    },
    text: {
        color: 'white',
        fontSize: 14,
        lineHeight: 20,
    }
})