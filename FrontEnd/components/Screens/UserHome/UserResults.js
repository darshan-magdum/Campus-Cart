import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';

const UserResults = () => {
  const navigation = useNavigation();
  
  const handleSendWhatsApp = () => {
    const phoneNumber = "+919876543210"; // Replace with actual support number
    const message = encodeURIComponent("Hello, I would like to receive my hearing test results.");
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>View Results</Text>
      </View>

      {/* Results Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Your hearing test results for both left and right ears are displayed below.
        </Text>

        <View style={styles.resultBox}>
          <Text style={styles.resultText}>🔵 Left Ear: 85% Hearing Ability</Text>
          <Text style={styles.resultText}>🟢 Right Ear: 90% Hearing Ability</Text>
        </View>

        {/* Send to WhatsApp */}
        <TouchableOpacity style={styles.whatsappButton} onPress={handleSendWhatsApp}>
          <Text style={styles.whatsappButtonText}>Get Results on WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  resultBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  whatsappButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserResults;
