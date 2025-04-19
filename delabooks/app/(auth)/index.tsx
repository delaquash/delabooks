import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View>
      <View>
        <Image 
          source={require("../../assets/images/Fireplace-cuate.png")}
        />
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})