import { Text, View } from "react-native";
import { Link } from 'expo-router';
export default function index() {
  return (
    <View>
      <Link href="/(auth)/signup">Login</Link>
      <Link href="/(auth)">Login</Link>
    </View>
  );
}
