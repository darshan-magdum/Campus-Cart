import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserContact = () => {
  const navigation = useNavigation();

  // Correct Google Maps URL with latitude & longitude
  const openGoogleMaps = () => {
    const placeName = encodeURIComponent("Dr. J. J. Magdum College of Engineering, Jaysingpur, Maharashtra, India");
    const url = `https://www.google.com/maps/search/?api=1&query=${placeName}`;
    Linking.openURL(url);
  };
  
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Contact Us</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          If you have any questions or need assistance, please reach out to us.
        </Text>

        <View style={styles.contactBox}>
          <Text style={styles.contactText}>📍 Address: Dr. J. J. Magdum College of Engineering, Jaysingpur, Maharashtra, India</Text>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.contactText}>📞 Contact Number: +91 98765 43210</Text>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.contactText}>✉️ Email: support@sonicminds.com</Text>
        </View>

        <TouchableOpacity style={styles.mapButton} onPress={openGoogleMaps}>
          <Text style={styles.mapButtonText}>View on Google Maps</Text>
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
  contactBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
  mapButton: {
    backgroundColor: '#301792',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  mapButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserContact;
