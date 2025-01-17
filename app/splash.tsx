// app/splash.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  
  const animatedValues = Array.from({ length: 8 }, () => useRef(new Animated.Value(0)).current); // 8 huruf

  useEffect(() => {
    
    const animations = animatedValues.map((animatedValue, index) =>
      Animated.timing(animatedValue, {
        toValue: 1, 
        duration: 300, 
        delay: index * 300, 
        useNativeDriver: true,
      })
    );

    
    Animated.stagger(300, animations).start(() => {
      
      setTimeout(() => router.replace('/login'), 1000);
    });
  }, [animatedValues, router]);

  
  const renderLetters = () => {
    const letters = ['F', 'L', 'U', 'E', 'N', 'T', 'I', 'X']; 
    return letters.map((letter, index) => (
      <Animated.Text
        key={index}
        style={[
          styles.letter,
          {
            opacity: animatedValues[index], 
            transform: [
              {
                translateY: animatedValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0], 
                }),
              },
            ],
          },
        ]}
      >
        {letter}
      </Animated.Text>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>{renderLetters()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', 
  },
  textContainer: {
    flexDirection: 'row', 
  },
  letter: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#00d1ff', 
    marginHorizontal: 2,
  },
});
