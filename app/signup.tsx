// app/signup.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebase/config'; 
import { getDocs, query, collection, where, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen() {
  const router = useRouter();

  
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      
      window.alert(`${title}: ${message}`);
    } else {
      
      Alert.alert(title, message);
    }
  };
  
  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignUp = async () => {
    
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      showAlert('Error', 'All fields are required!');
      console.log('Validation failed: missing fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      showAlert('Error', 'Passwords do not match!');
      console.log('Validation failed: passwords do not match');
      return;
    }
  
    try {
      
      const usernameQuery = await getDocs(query(collection(db, 'users'), where('username', '==', form.username)));
      const emailQuery = await getDocs(query(collection(db, 'users'), where('email', '==', form.email)));
  
      if (!usernameQuery.empty) {
        showAlert('Error', 'Username already taken, please choose another one!');
        console.log('Validation failed: username already exists');
        return;
      }
  
      if (!emailQuery.empty) {
        showAlert('Error', 'Email already registered, please use another one!');
        console.log('Validation failed: email already exists');
        return;
      }
  
      
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
  
      
      await setDoc(doc(db, 'users', user.uid), {
        username: form.username,
        email: form.email,
        createdAt: serverTimestamp(),
      });
  
      
      showAlert('Success', 'Account created successfully!');
      router.replace('/login'); // Redirect ke halaman login
    } catch (error: any) {
      console.error('Sign Up Error:', error.message);
      showAlert('Error', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create an Account</Text>

        {/* Input Username */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="johndoe"
            placeholderTextColor="#C7C7CD"
            style={styles.input}
            value={form.username}
            onChangeText={(text) => handleInputChange('username', text)}
          />
        </View>

        {/* Input Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="mail@example.com"
            placeholderTextColor="#C7C7CD"
            style={styles.input}
            value={form.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
        </View>

        {/* Input Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#C7C7CD"
            secureTextEntry
            style={styles.input}
            value={form.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />
        </View>

        {/* Input Confirm Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Re-Enter your password"
            placeholderTextColor="#C7C7CD"
            secureTextEntry
            style={styles.input}
            value={form.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
          />
        </View>

        {/* Button Sign Up */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Link to Login */}
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => router.push('/login')} // Navigasi ke login
          >
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B2347', // Background biru tua
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // Sintaks CSS untuk shadow
  },  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#F8F9FA',
    color: '#333333',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
