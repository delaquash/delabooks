import { KeyboardAvoidingView,Image, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constant/color'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Welcome() {
    const router = useRouter();
    const handlePush = async () => {
        // ✅ Optionally save onboarding status
        await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    
        // 👇 Use push if you want user to go back to Welcome screen later
        router.push('/(onboarding)/GetStarted');
    
        // 👇 Use replace if you want to remove Welcome screen from history
        // router.replace('/(onboarding)/GetStarted');
      };
    
     return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <View style={{ marginTop: -90}}>
                    <Image 
                    source={require("../../assets/images/book-cuate.png")}
                    resizeMode='contain'
                    style={{width:"100%", height:"70%", marginBottom: -8}}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Welcome to DelaBooks</Text>
                    <Text style={styles.subTitle}>
                        Discover thousands of books and manage your reading journey all in one place
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={handlePush}>
                        <Ionicons
                            name="arrow-forward-outline"
                            size={30}
                            color={COLORS.primary}
                            // style={}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
     )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: 20,
        justifyContent: "center",
    },
    title:{},
    subTitle:{}
})