import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from "react-native-vector-icons/Feather";

const UserHome = () => {
  const navigation = useNavigation();
  const [isUserView, setisUserView] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Campus Cart</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('UserMenu')}>
          <Ionicons name="menu" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('FullHearingTest')}>
          <FeatherIcon name="headphones" size={40} color="white" style={styles.icon} />
          <Text style={styles.boxText}>Full Hearing Test</Text>
          <Text style={styles.boxDescription}>Comprehensive test to assess your hearing capabilities.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('UserQuestionnaire')}>
          <FeatherIcon name="file-text" size={40} color="white" style={styles.icon} />
          <Text style={styles.boxText}>Questionnaire</Text>
          <Text style={styles.boxDescription}>Ask our AI system anything regarding hearing health.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('UserResults')}>
          <FeatherIcon name="bar-chart-2" size={40} color="white" style={styles.icon} />
          <Text style={styles.boxText}>View Result</Text>
          <Text style={styles.boxDescription}>Check the outcome of your hearing test and analysis.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('AboutUs')}>
          <FeatherIcon name="info" size={40} color="white" style={styles.icon} />
          <Text style={styles.boxText}>About Us</Text>
          <Text style={styles.boxDescription}>Learn more about Campus Cart and our mission.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Need Help?</Text>
        <Text style={styles.footerDescription}>Contact our support team for assistance with your hearing test.</Text>
        <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('ContactUs')}>
          <Text style={styles.contactButtonText}>Contact Support</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#301792', 
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
  box: {
    width: '45%',
    height: 175,
    backgroundColor: '#301792',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    padding: 10,
  },
  icon: {
    marginBottom: 8,
  },
  boxText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxDescription: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  footer: {
    marginTop: -5,
    padding: 20,
    backgroundColor: '#301792',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  footerDescription: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  contactButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  contactButtonText: {
    color: '#301792',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserHome;
