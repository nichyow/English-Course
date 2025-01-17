// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config'; 

export default function LoginScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isPressed, setIsPressed] = useState(false); 


  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignIn = async () => {
    
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please enter both email and password!');
      return;
    }

    
    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      Alert.alert('Success', `Welcome back, ${user.email}!`);
      router.replace('/home'); // Arahkan ke halaman home setelah login berhasil
    } catch (error: any) {
      console.error('Login Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

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

        <TouchableOpacity
          style={[styles.button, isPressed && styles.buttonPressed]}
          onPressIn={() => setIsPressed(true)}  // Menyentuh tombol
          onPressOut={() => setIsPressed(false)} // Melepaskan sentuhan
          onPress={handleSignIn}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => router.push('/signup')} // Navigasi ke signup
          >
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B2347', // Background biru tua
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 50, // Menyesuaikan padding top untuk iOS
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
    opacity: 1, // Normal state opacity
  },
  buttonPressed: {
    backgroundColor: '#0056b3', // Warna tombol saat ditekan
    opacity: 0.8, // Opacity saat ditekan
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
