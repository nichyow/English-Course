import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();

  const renderCard = (icon : string, title : string, description : string, onPress:()=> void) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <LinearGradient
        colors={['#ffffff', '#f8f9ff']}
        style={styles.cardGradient}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1a365d', '#2a4a7f']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.headerText}>English Virtual Lab</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}onPress={() => router.push('/profile')}>
            <Text style={styles.profileText} >👤</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderCard(
          '📘',
          'Vocabulary Game',
          'Expand your vocabulary through interactive word-matching games and challenges.',
          () => router.push('/vocab')
        )}

        {renderCard(
          '✏️',
          'Grammar Quiz',
          'Master English grammar with our comprehensive quiz system.',
          () => router.push('/grammar')
        )}

        {renderCard(
          '📚',
          'Reading Comprehension',
          'Improve your understanding with engaging passages and questions.',
          () => router.push('/reading')
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7ff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#a0aec0',
    marginBottom: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    fontSize: 24,
  },
  content: {
    padding: 20,
    paddingTop: 30,
  },
  card: {
    marginBottom: 20,
    borderRadius: 20,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', // Mengganti shadow menjadi boxShadow
  },
  cardGradient: {
    padding: 20,
    borderRadius: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f4ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
});