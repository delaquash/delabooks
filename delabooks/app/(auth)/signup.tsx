import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constant/color'

const Signup = () => {
  const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container} >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>BookWorm</Text>
            <Text style={styles.subTitle}>Share your favorite reads.</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Input Container */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}> Username</Text>
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
            </View>
          </View>
          </View>
        {/* </View> */}
    </KeyboardAvoidingView>
  )
}

export default Signup

const styles = StyleSheet.create({
  container:{
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center"
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  header: {},
  title:{},
  subTitle:{},
  formContainer:{},
  label:{},
  inputGroup:{},
  inputContainer:{},
  input:{},
  inputIcon:{},
  eyeIcon:{}
})