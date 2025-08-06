import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserQuestionnaire = () => {
  const navigation = useNavigation();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleAskAI = async () => {
    if (!question.trim()) {
      setResponse('Please enter a question.');
      return;
    }

    // Simulated AI response (Replace with OpenAI API or another AI service)
    setResponse("This is an AI-generated response regarding hearing health. Replace this with API response.");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Questionnaire</Text>
      </View>

      {/* Information Text */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Ask our AI assistant anything regarding hearing problems and improvements.
        </Text>

        {/* Input Box for User Question */}
        <TextInput
          style={styles.input}
          placeholder="Type your question here..."
          placeholderTextColor="#666"
          value={question}
          onChangeText={setQuestion}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.askButton} onPress={handleAskAI}>
          <Text style={styles.askButtonText}>Ask AI</Text>
        </TouchableOpacity>

        {/* AI Response Section */}
        {response ? (
          <View style={styles.responseBox}>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#301792',
  },
  backButton: {
    padding: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  infoContainer: {
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  askButton: {
    backgroundColor: '#301792',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  askButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  responseBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    elevation: 5,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});

export default UserQuestionnaire;
