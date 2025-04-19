import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons"
import COLORS from '@/constant/color';
import { Link } from "expo-router";


const { width } = Dimensions.get("window");


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View style={styles.container}>
      <View 
      // style={styles.topIllustration}
      >
        <Image 
          source={require("../../assets/images/Fireplace-cuate.png")}
          resizeMode='contain'
          // style={styles.illustrationImage}
        />
      </View>
      <View
        // style={styles.card}
      >
        <View
          // style={styles.formContainer}
        >
          {/* Email */}
          <View>
            <Text>Email</Text>
            <View>
              <Ionicons 
                name="mail-outline"
                size={20}
                color= {COLORS.primary}
                // style={styles.inputIcon}
              />
              <TextInput
                value={email}
                placeholder='Please enter your email address'
                onChangeText={setEmail}
                keyboardType='email-address'
                keyboardAppearance='default'
                // style={styles.input}
                autoCapitalize='none'
                placeholderTextColor={COLORS.placeholderText}
              />
            </View>
          </View>
          {/* Password */}
          <View>
            <Text>Password</Text>
            <View>
              <Ionicons 
                name="lock-closed-outline"
                size={20}
                // style={styles.inputIcon}
                color={COLORS.primary}
              />
              <TextInput
                value={password}
                placeholder='Please enter your password'
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                // style={styles.input}
                // placeholderTextColor={}
              />
              <TouchableOpacity
                onPress={()=>setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.primary}                  
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            // style={styles.button}
            // onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
                  <ActivityIndicator color="#fff"/>
            ) : (
              <Text 
              // style={styles.buttonText}
              > 
                Login 
              </Text>
            )}
          </TouchableOpacity>

          {/* FOOTER */}
          <View 
            // style={styles.footer}
          >
            <Text
              // style={styles.footerText}
            >
              Don't have an account? 
            </Text>
            <Link
              href="/signup"
              asChild
            >
            <TouchableOpacity>
            <Text
                // style={styles.link}
              >
                Sign UP
              </Text>
            </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {

  }
})