import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RequestItem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Item</Text>
      <Text style={styles.text}>If an item is not available, you can request it here. The request will go to all nearby shopkeepers.</Text>
    </View>
  );
};

export default RequestItem;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, textAlign: 'center' },
});
