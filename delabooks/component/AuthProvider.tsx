import { useEffect, useState } from 'react';
// @ts-ignore
import { useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// This component manages the authentication flow

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, token, checkAuth } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  const [isReady, setIsReady] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Check onboarding and auth on mount
  useEffect(() => {
    const prepareApp = async () => {
      const onboardingStatus = await AsyncStorage.getItem("hasCompletedOnboarding");
      setHasSeenOnboarding(onboardingStatus === "true");

      await checkAuth();
      setIsReady(true);
    };

    prepareApp();
  }, []);

  // Navigation logic after everything is ready
  useEffect(() => {
    if (!isReady) return;

    const inOnboardingGroup = segments[0] === "(onboarding)";
    const inTabsGroup = segments[0] === "(tabs)";
    const currentScreen = segments[1]; // e.g., "welcome" or "getstarted"

    if (!hasSeenOnboarding) {
      // First-time user → Welcome screen
      if (currentScreen !== "welcome") {
        router.replace("/(onboarding)/welcome");
      }
    } else if (!user || !token) {
      // Onboarded but not logged in → GetStarted screen
      if (currentScreen !== "GetStarted") {
        router.push("/(onboarding)/GetStarted");
      }
    } else {
      // Authenticated → Tabs screen
      if (!inTabsGroup) {
        router.replace("/(tabs)");
      }
    }
  }, [isReady, user, token, segments, hasSeenOnboarding]);

  // While loading, return nothing or a loading spinner
  if (!isReady) return null;

  return <>{children}</>;
}
