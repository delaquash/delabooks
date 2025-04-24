import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
// @ts-ignore
import { Link, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function index() {
  const router = useRouter();
  useEffect(() => {
    // Our AuthProvider will handle the actual redirection logic
    // This is just a fallback in case someone navigates directly to '/'
    
    // You can optionally add a timeout to ensure this screen doesn't stay visible for too long
    const timeout = setTimeout(() => {
      router.push('/(onboarding)/welcome');
    }, 100);
    
    return () => clearTimeout(timeout);
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