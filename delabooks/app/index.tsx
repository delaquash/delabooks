import { Text, View, StyleSheet } from "react-native";
import { Link, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from "@/store/authStore";

export default function index() {
  const router = useRouter();
  const segments = useSegments();
  const {user, token, checkAuth } = useAuthStore()
  return (
    <View style={styles.cotainer}>
      <Link href="/(auth)/signup">Sign Up</Link>
      <Link href="/(auth)">Login</Link>
    </View>
  );
}


const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "blue"
  }
})