import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GetStartedScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    // Mark onboarding as complete
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.replace('/(auth)');
  };

  const handleSignup = async () => {
    // Mark onboarding as complete
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.replace('/(auth)/signup');
  };

  return (
    <GestureHandlerRootView>
    <View style={styles.container}>
      {/* Your onboarding image */}
      <Image 
        source={require('@/assets/images/Authentication-rafiki.png')}
        style={styles.image}
        resizeMode="contain"
      />
      
      <Text style={styles.title}>Ready to Start?</Text>
      <Text style={styles.subtitle}>
        Create an account or log in to start exploring your next favorite book
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  image: {
    width: '80%',
    height: 300,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 48,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
    alignItems: 'center',
  },
  signupText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: '600',
  },
});