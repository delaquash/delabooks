import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
// @ts-ignore
import { Link, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkUserFlow = async () => {
      const onboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem('user');
      const onboardingTime = await AsyncStorage.getItem('onboardingTimestamp');
      const user = userJson ? JSON.parse(userJson) : null;
      const now = Date.now();

      if (!onboarding) {
        router.replace('/(onboarding)/Welcome');
        return;
      }

      // Check if 24 hours have passed since last onboarding
      if (onboardingTime && now - parseInt(onboardingTime) > 24 * 60 * 60 * 1000) {
        await AsyncStorage.setItem('onboardingTimestamp', now.toString());
        router.replace('/(onboarding)/GetStarted');
        return;
      }

      if (token && user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(onboarding)/GetStarted');
      }
    };

    checkUserFlow();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
