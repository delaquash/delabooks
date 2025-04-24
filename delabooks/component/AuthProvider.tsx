import { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// This component manages the authentication flow
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, token, checkAuth } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);
  
  // This checks if the user has seen the onboarding
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  
  // Check auth status when app loads
  useEffect(() => {
    const prepareApp = async () => {
      // Check if user has completed onboarding before
      const onboardingStatus = await AsyncStorage.getItem('hasCompletedOnboarding');
      setHasSeenOnboarding(onboardingStatus === 'true');
      
      // Check authentication
      await checkAuth();
      setIsReady(true);
    };
    
    prepareApp();
  }, []);
  
  // Handle navigation based on auth status
  useEffect(() => {
    if (!isReady) return;
    
    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inTabsGroup = segments[0] === '(tabs)';
    
    // Handle navigation logic
    if (!hasSeenOnboarding) {
      // If user hasn't seen onboarding, always show onboarding first
      if (!inOnboardingGroup) {
        router.replace('/(onboarding)/welcome');
      }
    } else if (user && token) {
      // User is authenticated
      if (!inTabsGroup) {
        router.replace('/(tabs)');
      }
    } else {
      // User is not authenticated
      if (!inAuthGroup) {
        router.replace('/(auth)');
      }
    }
  }, [isReady, user, token, segments, hasSeenOnboarding]);
  
  // Show nothing while checking authentication
  if (!isReady) return null;
  
  // Render the rest of the app
  return <>{children}</>;
}