import SafeAreaScreen from "@/component/SafeAreaScreen";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/component/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
    <SafeAreaProvider>
      <SafeAreaScreen >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"  />
          <Stack.Screen name="(tabs)"  />
          <Stack.Screen name="(auth)"  />
        </Stack>
      </SafeAreaScreen>
      <StatusBar style="light"/>
    </SafeAreaProvider>
    </AuthProvider>
  );
}
