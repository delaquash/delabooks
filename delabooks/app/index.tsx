import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
// @ts-ignore
import { useRouter } from 'expo-router';
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkUserFlow = async () => {
      // Retrieve flags and user data from AsyncStorage
      const onboarding = await AsyncStorage.getItem('hasCompletedOnboarding'); // Flag to check if user finished onboarding
      const token = await AsyncStorage.getItem('token'); // Logged in user token
      const userJson = await AsyncStorage.getItem('user'); // Serialized user object
      const onboardingTime = await AsyncStorage.getItem('onboardingTimestamp'); // When user last completed onboarding

      const user = userJson ? JSON.parse(userJson) : null; // Parse user if it exists
      const now = Date.now(); // Current time in milliseconds

      // ✅ If user has never completed onboarding, send them to the Welcome screen
      if (!onboarding) {
        router.push('/(onboarding)/Welcome');
        return;
      }

      // ✅ If 15 minutes have passed since last onboarding, show GetStarted again
      if (onboardingTime && now - parseInt(onboardingTime) > 15 * 60 * 1000) {
        // Update the timestamp to reset the 15-minute timer
        await AsyncStorage.setItem('onboardingTimestamp', now.toString());

        // Push the user to GetStarted screen to choose login or signup
        router.push('/(onboarding)/GetStarted');
        return;
      }

      // ✅ If user has a token and user data (authenticated), navigate to tab layout
      if (token && user) {
        router.push('/(tabs)');
      } else {
        // ✅ User completed onboarding but is not logged in – send them to GetStarted screen
        router.push('/(onboarding)/GetStarted');
      }
    };

    // Run the user flow check on component mount
    checkUserFlow();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {/* Loading spinner while we check user's state */}
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
