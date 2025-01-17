import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image,ScrollView } from 'react-native';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import backIcon from '../assets/images/arrow.png';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Phone, Home, MapPin, Mail } from 'react-native-feather';



export default function ProfileScreen() {
  const router = useRouter();
  
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    campus: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
           const user = auth.currentUser;
           if (user) {
              const userDoc = await getDoc(doc(db, 'users', user.uid));
              if (userDoc.exists()) {
                 const data = userDoc.data();
                 setUserData({
                    username: data.username || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    campus: data.campus || '',
                    address: data.address || '',
                 });
              } else {
                 Alert.alert('Error', 'User data not found!');
              }
           }
        } catch (error) {
           console.error('Error fetching user data:', error);
           Alert.alert('Error', 'Failed to fetch user data.');
        }
     };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser; 
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), userData);
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save user data.');
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      router.replace('/login'); 
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout.');
    }
  };
  const renderField = (label : string, value : string, icon : React.ReactNode , onChangeText : (text: string) => void =() => {}, isEmail = false) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        isEditing && !isEmail && styles.editableInput
      ]}>
        {icon}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          editable={isEditing && !isEmail}
          placeholderTextColor="#94A3B8"
        />
      </View>
    </View>
  );
  return (
    <LinearGradient
      colors={['#3B82F6', '#1D4ED8']}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.push('/home')} 
            style={styles.backButton}
          >
            <View style={styles.backButtonContainer}>
              <Image source={backIcon} style={styles.backIcon} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {userData.username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.username}>{userData.username}</Text>
          </View>

          {renderField(
            "Username",
            userData.username,
            <User size={20} color="#64748B" style={styles.fieldIcon} />,
            () => {},
            true
          )}

          {renderField(
            "Email",
            userData.email,
            <Mail size={20} color="#64748B" style={styles.fieldIcon} />,
            () => {},
            true
          )}

          {renderField(
            "Phone",
            userData.phone,
            <Phone size={20} color="#64748B" style={styles.fieldIcon} />,
            (text : string) => setUserData({ ...userData, phone: text })
          )}

          {renderField(
            "Campus",
            userData.campus,
            <Home size={20} color="#64748B" style={styles.fieldIcon} />,
            (text : string) => setUserData({ ...userData, campus: text })
          )}

          {renderField(
            "Address",
            userData.address,
            <MapPin size={20} color="#64748B" style={styles.fieldIcon} />,
            (text : string) => setUserData({ ...userData, address: text })
          )}

          {isEditing ? (
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  backButtonContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    flex: 1,
    minHeight: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
  },
  fieldIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  editableInput: {
    backgroundColor: '#fff',
    borderColor: '#3B82F6',
  },
  editButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
