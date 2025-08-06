import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyOrders = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <Text style={styles.text}>Track your current and previous orders here. See delivery status and item details.</Text>
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, textAlign: 'center' },
});
