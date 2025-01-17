// app/splash.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  // Buat Animated Values untuk setiap huruf
  const animatedValues = Array.from({ length: 8 }, () => useRef(new Animated.Value(0)).current); // 8 huruf

  useEffect(() => {
    // Fungsi untuk mengatur animasi tiap huruf
    const animations = animatedValues.map((animatedValue, index) =>
      Animated.timing(animatedValue, {
        toValue: 1, // Animasi ke opacity 1
        duration: 300, // Durasi setiap huruf
        delay: index * 300, // Delay berdasarkan urutan huruf
        useNativeDriver: true,
      })
    );

    // Jalankan animasi secara berurutan
    Animated.stagger(300, animations).start(() => {
      // Setelah animasi selesai, navigasi ke halaman berikutnya
      setTimeout(() => router.replace('/login'), 1000);
    });
  }, [animatedValues, router]);

  // Komponen teks huruf dengan animasi
  const renderLetters = () => {
    const letters = ['F', 'L', 'U', 'E', 'N', 'T', 'I', 'X']; // Huruf FLUENTIX
    return letters.map((letter, index) => (
      <Animated.Text
        key={index}
        style={[
          styles.letter,
          {
            opacity: animatedValues[index], // Animasi opacity tiap huruf
            transform: [
              {
                translateY: animatedValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0], // Animasi bergerak dari bawah ke atas
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
    backgroundColor: '#121212', // Latar belakang gelap
  },
  textContainer: {
    flexDirection: 'row', // Huruf ditampilkan dalam satu baris
  },
  letter: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#00d1ff', // Warna biru mencolok
    marginHorizontal: 2,
  },
});
