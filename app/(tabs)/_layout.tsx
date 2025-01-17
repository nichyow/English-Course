import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(); 
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
      } catch (error) {
        console.error('Error preparing app:', error);
      } finally {
        
        setAppIsReady(true);

        
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  
  if (!appIsReady) {
    return null; 
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
