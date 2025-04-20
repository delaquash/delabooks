import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ActivityIndicator, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons"
import COLORS from '@/constant/color';
import { Link } from "expo-router";
import { KeyboardAvoidingView } from 'react-native';

const { width } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  return (
    <KeyboardAvoidingView
      style={{ flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollViewStyle}>
      <View style={styles.container}>
      <View 
      style={styles.topIllustration}
      >
        <Image 
          source={require("../../assets/images/Fireplace-cuate.png")}
          resizeMode='contain'
          style={styles.illustrationImage}
        />
      </View>
      <View
        style={styles.card}
      >
        <View
          style={styles.formContainer}
        >
          {/* Email */}
          <View
            style={styles.inputGroup}
          >
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons 
                name="mail-outline"
                size={25}
                color= {COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                value={email}
                placeholder='Please enter your email address'
                onChangeText={setEmail}
                keyboardType='email-address'
                // keyboardAppearance='default'
                style={styles.input}
                autoCapitalize='none'
                placeholderTextColor={COLORS.placeholderText}
              />
            </View>
          </View>
          {/* Password */}
          <View  style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons 
                name="lock-closed-outline"
                size={25}
                style={styles.inputIcon}
                color={COLORS.primary}
              />
              <TextInput
                value={password}
                placeholder='Please enter your password'
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholderTextColor={COLORS.placeholderText}  
              />
              <TouchableOpacity
                onPress={()=>setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={30}
                  color={COLORS.primary}                  
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            // onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
                  <ActivityIndicator color="#fff"/>
            ) : (
              <Text 
              style={styles.buttonText}
              > 
                Login 
              </Text>
            )}
          </TouchableOpacity>

          {/* FOOTER */}
          <View 
            style={styles.footer}
          >
            <Text
              style={styles.footerText}
            >
              Don't have an account? 
            </Text>
            <Link
              href="/signup"
              asChild
            >
            <TouchableOpacity>
            <Text
                style={styles.link}
              >
                Sign UP
              </Text>
            </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>

    </ScrollView>
            </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center"
  },
  topIllustration: {
    alignItems: "center",
    width: "100%",
    // marginBottom:20
  },
  illustrationImage: {
    width: width * 0.75,
    height: width * 0.75,
  },
  card: {
    color: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginBottom: 80
  },
  formContainer: {
    marginBottom: 16
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    // textAlign: "center",
    color: COLORS.textPrimary,
    marginBottom: 25
  },
  inputIcon: {
    marginRight: 10
  }, 
  input: {
    flex: 1,
    height: 58,
    color: COLORS.textDark,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  eyeIcon:{
    padding:8
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "600"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36
  },
  footerText:{
    color: COLORS.textSecondary,
    marginRight: 5
  },
  link: {
    color: COLORS.primary,
    fontWeight: "600"
  }
})