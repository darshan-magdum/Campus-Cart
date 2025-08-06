import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoScreen = () => {
  const navigation = useNavigation();
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

 const infoItems = [
  {
    title: "Who we are",
    description: "A smart shopping platform connecting hostel students with nearby local shops."
  },
  {
    title: "Search & Order Items",
    description: "Easily find groceries, stationery, snacks, and more from nearby shops and place orders for hostel delivery."
  },
  {
    title: "Request Unavailable Items",
    description: "Can’t find what you need? Send a request and nearby shopkeepers will respond if they can fulfill it."
  },
  {
    title: "Track & Receive Orders",
    description: "Track your orders and receive items directly at your hostel with real-time updates from shopkeepers."
  }
];
  

  const handleNext = () => {
    if (currentInfoIndex < infoItems.length - 1) {
      setCurrentInfoIndex(currentInfoIndex + 1);
    } else {
      navigation.navigate('Login'); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Campus Cart</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoItem}>
          <Text style={styles.bold}>{infoItems[currentInfoIndex].title}:</Text> {infoItems[currentInfoIndex].description}
        </Text>
      </View>

      <TouchableOpacity 
      style={styles.buttonstyles}
  onPress={handleNext} 
>
  <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Next</Text>
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  buttonstyles:{
    backgroundColor: '#301792', 
    paddingVertical: 12, 
    paddingHorizontal: 22, 
    borderRadius: 10 

  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#301792',
  },
  infoContainer: {
    backgroundColor: 'transparent', 
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },  
  infoItem: {
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 24,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#301792',
  },
});

export default InfoScreen;
