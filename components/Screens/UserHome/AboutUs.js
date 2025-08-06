import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>About Us</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Welcome to Campus Cart</Text>
        <Text style={styles.description}>
          At **Campus Cart**, we believe that hearing health is essential for a high quality of life. 
          Our project is designed to help individuals assess their hearing capabilities and take necessary steps 
          toward better auditory health. With a simple and effective hearing test, users can evaluate their 
          left and right ear's ability to detect different frequencies.
        </Text>

        <Text style={styles.sectionTitle}>What We Offer</Text>

        {/* Hearing Test Feature */}
        <View style={styles.featureBox}>
          <Text style={styles.featureTitle}>🎧 Comprehensive Hearing Test</Text>
          <Text style={styles.featureDescription}>
            Our hearing test is designed to assess the ability to hear different sound frequencies in both ears. 
            This test follows **scientific principles** to measure hearing sensitivity by playing sounds at varying 
            pitch levels. The test helps determine if a user has **normal hearing**, mild to severe **hearing loss**, 
            or any imbalance between the left and right ear.
          </Text>
          <Text style={styles.featureDescription}>
            This test is simple, yet highly effective in detecting early signs of hearing impairment. 
            We recommend taking the test in a **quiet environment** using **earphones** for the best results.
          </Text>
        </View>

        {/* WhatsApp Results Feature */}
        <View style={styles.featureBox}>
          <Text style={styles.featureTitle}>📲 Receive Results on WhatsApp</Text>
          <Text style={styles.featureDescription}>
            To ensure convenience, once the hearing test is completed, users can receive their results 
            **directly on WhatsApp**. This eliminates the need for additional apps or email verifications. 
            Users can store, review, and share their hearing test results with doctors or hearing specialists if necessary.
          </Text>
          <Text style={styles.featureDescription}>
            The results provide a **detailed breakdown** of hearing levels in both ears, indicating whether 
            any **hearing loss** has been detected and if further consultation with an audiologist is recommended.
          </Text>
        </View>

        {/* AI Assistance Feature */}
        <View style={styles.featureBox}>
          <Text style={styles.featureTitle}>🤖 AI-Powered Hearing Assistance</Text>
          <Text style={styles.featureDescription}>
            Understanding hearing issues can be challenging, which is why we offer an **AI-powered assistant** to 
            answer questions related to hearing health. Users can ask the AI system about:
          </Text>
          <Text style={styles.bulletPoint}>• Causes of hearing problems and possible symptoms</Text>
          <Text style={styles.bulletPoint}>• How to prevent hearing loss with simple daily habits</Text>
          <Text style={styles.bulletPoint}>• When to seek professional help for hearing issues</Text>
          <Text style={styles.bulletPoint}>• Available hearing aids and treatment options</Text>
          <Text style={styles.featureDescription}>
            This AI-powered system is built to provide **reliable** and **instant responses** to help users make 
            informed decisions about their hearing health.
          </Text>
        </View>

        {/* Mission Statement with White Background */}
        <View style={styles.missionBox}>
          <Text style={styles.featureTitle}>🌍 Our Mission</Text>
          <Text style={styles.featureDescription}>
            Our goal at **Campus Cart** is to make hearing assessments accessible and convenient for everyone.  
            We want to help users **detect hearing problems early**, take necessary precautions, and seek professional help 
            when needed.
          </Text>
          <Text style={styles.featureDescription}>
            Whether you're experiencing hearing difficulties or simply want to monitor your hearing health, our platform 
            is designed to **empower you** with valuable insights and AI-driven guidance.
          </Text>
        </View>

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
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#301792',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 22,
  },
  featureBox: {
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
  missionBox: {
    backgroundColor: 'white', // White background for Our Mission
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#301792',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    lineHeight: 22,
  },
});

export default AboutUs;
