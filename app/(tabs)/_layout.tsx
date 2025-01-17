import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

// Mencegah Splash bawaan Expo hilang otomatis
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Mendapatkan tema perangkat
  const [appIsReady, setAppIsReady] = useState(false);

  // Menyiapkan aplikasi, seperti menyembunyikan Splash bawaan Expo
  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Tambahkan persiapan lain jika diperlukan (misalnya, memuat data atau konfigurasi)
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulasi 2 detik persiapan
      } catch (error) {
        console.error('Error preparing app:', error);
      } finally {
        // Tandai aplikasi siap
        setAppIsReady(true);

        // Sembunyikan Splash bawaan Expo
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  // Render hanya jika aplikasi sudah siap
  if (!appIsReady) {
    return null; // Tetap pada Splash bawaan Expo sampai siap
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Rute untuk Splash */}
        <Stack.Screen
          name="splash"
          options={{ headerShown: false }}
        />

        {/* Rute untuk Login */}
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
        />

        {/* Rute untuk Tab Navigasi (halaman utama) */}
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        {/* Rute untuk menangani halaman yang tidak ditemukan */}
        <Stack.Screen
          name="not-found"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
