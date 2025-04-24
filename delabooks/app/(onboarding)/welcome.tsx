import {
    KeyboardAvoidingView,
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { Ionicons } from '@expo/vector-icons';
  import COLORS from '@/constant/color';
  // @ts-ignore
  import { useRouter } from 'expo-router';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  export default function Welcome() {
    const router = useRouter();
    const [isReturningUser, setIsReturningUser] = useState(false);
  
    useEffect(() => {
      const checkIfReturningUser = async () => {
        const timestamp = await AsyncStorage.getItem('onboardingTimestamp');
        if (timestamp) {
          const now = Date.now();
          const lastTime = parseInt(timestamp, 10);
  
          // If 24 hours have passed, consider user returning
          if (now - lastTime >= 15 * 60 * 1000) { // 15 minutes
            setIsReturningUser(true);
          }
        }
      };
  
      checkIfReturningUser();
    }, []);
  
    const handlePush = async () => {
      // ✅ Save onboarding status
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
  
      // ✅ Save current timestamp
      await AsyncStorage.setItem('onboardingTimestamp', Date.now().toString());
  
      // 👇 Go to GetStarted screen
      router.push('/(onboarding)/GetStarted');
    };
  
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <View style={{ marginTop: -90 }}>
            <Image
              source={require('../../assets/images/book-cuate.png')}
              resizeMode="contain"
              style={{ width: '100%', height: '70%', marginBottom: -8 }}
            />
          </View>
  
          {/* Optional welcome back message */}
          {isReturningUser && (
            <Text style={styles.returningUserText}>
              👋 Hey, welcome back! We've missed you. Ready to dive into more books?
            </Text>
          )}
  
          <View>
            <Text style={styles.title}>Welcome to DelaBooks</Text>
            <Text style={styles.subTitle}>
              Discover thousands of books and manage your reading journey all in one place
            </Text>
          </View>
  
          <View>
            <TouchableOpacity onPress={handlePush}>
              <Ionicons name="arrow-forward-outline" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: COLORS.background,
      padding: 20,
      justifyContent: 'center',
    },
    returningUserText: {
      fontSize: 16,
      color: COLORS.primary,
      fontStyle: 'italic',
      marginBottom: 12,
      textAlign: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: COLORS.textDark || '#000',
    },
    subTitle: {
      fontSize: 16,
      color:  '#555',
      textAlign: 'center',
      marginBottom: 32,
    },
  });
  