import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [contacts, setContacts] = useState([]);

  // ✅ Gumagamit ng localStorage — GUMAGANA AGAD SA SNACK! WALANG DEPENDENCY!
  useEffect(() => {
    const saved = localStorage.getItem('JnT_Contacts');
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  // ✅ Save contact
  const saveContact = () => {
    if (!name || !number) {
      Alert.alert('⚠️ Punan ang Pangalan at Number!');
      return;
    }
    
    const newContact = {
      id: Date.now().toString(),
      name: name,
      number: number
    };
    
    const updatedList = [...contacts, newContact];
    setContacts(updatedList);
    localStorage.setItem('JnT_Contacts', JSON.stringify(updatedList));
    
    // Clear inputs
    setName('');
    setNumber('');
    
    Alert.alert('✅ Na-save!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 J&T RIDER — DELIVERY</Text>
      
      <Text style={styles.label}>Pangalan ng Receiver</Text>
      <TextInput
        style={styles.input}
        placeholder="Ilagay ang pangalan"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      
      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        placeholder="09XX XXX XXXX"
        value={number}
        onChangeText={setNumber}
        keyboardType="phone-pad"
      />
      
      <View style={styles.buttonContainer}>
        <Button
          title="✅ I-SAVE ANG CONTACT"
          color="#E2001A"
          onPress={saveContact}
        />
      </View>
      
      <Text style={styles.listTitle}>Listahan ng Receiver ({contacts.length})</Text>
      
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactNumber}>{item.number}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 10,
    color: '#E2001A',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 25,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1d1d1f',
  },
  contactItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E2001A',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1d1d1f',
  },
  contactNumber: {
    fontSize: 14,
    color: '#86868b',
  },
});
