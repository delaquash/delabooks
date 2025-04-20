import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'

const Signup = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container} >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={}>

          </View>

          </View>
        </View>
    </KeyboardAvoidingView>
  )
}

export default Signup

const styles = StyleSheet.create({})