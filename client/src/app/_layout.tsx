import { Stack } from 'expo-router';
import "..global.css"
import {ClerkProvider} from "@clerk/clerk-expo"
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { router } from 'expo-router';

export default function RootLayout() {
  useEffect(() => {
    // Handle Android back button
    if (Platform.OS === 'android') {
      const backAction = () => {
        // Check if we're on a card screen and navigate back to home
        const currentRoute = router.canGoBack();
        if (currentRoute) {
          router.back();
          return true; // Prevent default behavior (app exit)
        }
        return false; // Allow default behavior on home screen
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, []);

  return(
    <ClerkProvider tokenCache={tokenCache}>
      <Stack
        screenOptions={{
          gestureEnabled: true, // Enable swipe back gesture
          headerShown: false,   // Hide header for clean card UI
          gestureDirection: 'horizontal', // Horizontal swipe for navigation
          animation: 'slide_from_right', // Smooth slide animation
        }}
      >
        {/* Default route - (home) group will handle / route */}
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
        {/* Card screens */}
        <Stack.Screen 
          name="cards/MyCards" 
          options={{
            gestureEnabled: true,
            headerShown: false,
            title: 'My Cards',
          }} 
        />
        <Stack.Screen 
          name="cards/createcards" 
          options={{
            gestureEnabled: true,
            headerShown: false,
            presentation: 'modal', // Modal presentation for create card
            gestureDirection: 'horizontal', // Override modal default
            title: 'Create Card',
          }} 
        />
      </Stack>
    </ClerkProvider>
    );
}
