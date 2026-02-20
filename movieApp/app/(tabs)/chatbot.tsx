import { StyleSheet, View, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform, Text } from 'react-native'
import React, { useState, useRef } from 'react'
import ChatbotSearch from '@/components/ChatbotSearch'
import ConvoCard from '@/components/ConvoCard'

const RAG_API_URL = `http://10.132.22.165000/chat`

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

const Chatbot = () => {

  const [messages, setMessages] = useState<Message[]>([
    {id: '0', 
    text : 'Hi! I am your movie recommendation friend, How can I help today?',
    isBot: true}
  ])

  const[input, setInput] = useState('')
  const[loading, setLoading] = useState(false)
  const flatListRef = useRef<FlatList>(null);

  const handleSubmit = async () => {
    const userMessage : Message = {
      id: Date.now.toString(), 
      text: input, 
      isBot: false
    }

    setMessages(prev => [...prev, userMessage])
    setInput('');
    setLoading(true);

    console.log(RAG_API_URL);

    try{
    const response = await fetch(RAG_API_URL, 
      {method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: input.trim()})}
    )

    const data = await response.json();

    const output : Message = {
      id: (Date.now() + 1).toString(), 
      text: data.response, 
      isBot: true
    }

    setMessages(prev => [...prev, output])
    } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I couldn't connect to the server. Make sure the RAG chatbot is running!",
                isBot: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
  }
  return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>🎬 Movie Assistant</Text>
            </View>

            {/* Messages */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ConvoCard text={item.text} isBot={item.isBot} />
                )}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                contentContainerStyle={styles.messageList}
                showsVerticalScrollIndicator={false}
            />

            {/* Loading indicator */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#ab8bff" />
                    <Text style={styles.loadingText}>Finding movies...</Text>
                </View>
            )}

            {/* Input */}
            <ChatbotSearch
                placeholder="Ask for a movie recommendation..."
                value={input}
                onChangeText={setInput}
                onSubmit={handleSubmit}
            />
        </KeyboardAvoidingView>
    )
}

export default Chatbot

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0d23',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a3e',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    messageList: {
        paddingTop: 16,
        paddingBottom: 8,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        gap: 8,
    },
    loadingText: {
        color: '#ab8bff',
        fontSize: 12,
    }
})