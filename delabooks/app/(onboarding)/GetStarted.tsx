import { View, Text, StyleSheet, Image } from 'react-native';
// @ts-ignore
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function GetStartedScreen() {
  const router = useRouter();
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    const checkIfReturningUser = async () => {
      const timestamp = await AsyncStorage.getItem('onboardingTimestamp');

      if (timestamp) {
        const now = Date.now();
        const lastTime = parseInt(timestamp, 10);

        // If 24 hours have passed, show returning user message
        if (now - lastTime >= 24 * 60 * 60 * 1000) {
          setIsReturningUser(true);
        }
      }
    };

    checkIfReturningUser();
  }, []);

  const handleLogin = async () => {
    // Mark onboarding as complete
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');

    // Save current timestamp
    await AsyncStorage.setItem('onboardingTimestamp', Date.now().toString());

    // Navigate to login
    router.push('/(auth)');
  };

  const handleSignup = async () => {
    // Mark onboarding as complete
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');

    // Save current timestamp
    await AsyncStorage.setItem('onboardingTimestamp', Date.now().toString());

    // Navigate to signup
    router.push('/(auth)/signup');
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Image 
          source={require('@/assets/images/Authentication-rafiki.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Show a welcome back message if user is returning */}
        {isReturningUser && (
          <Text style={styles.returningUserText}>
            👋 Welcome back! It's been a while. Log in or sign up to continue.
          </Text>
        )}

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
  returningUserText: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
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
