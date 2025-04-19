import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router/';
export default function index() {
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