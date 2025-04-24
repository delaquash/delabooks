import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react';
// @ts-ignore 
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constant/color';

const Create = () => {
  const router = useRouter();
  const [laoding, setLaoding] = useState(false)
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("")
  const [rating, setRating] = useState(3)
  const [imagebase64, setImagebase64] = useState(null)
  return (
       <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === "ios" ? "padding" : "height"}
       >
         <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Add Book Recommendation</Text>
              <Text style={styles.subTitle}>Share your favorite reads with others.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              {/* Text Input for Book Title */}
              <View style={styles.inputContainer}>
                  <Ionicons
                      name="book-outline"
                      size={24}
                      color={COLORS.textSecondary}
                      style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder='Enter Book Title'
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholderTextColor={COLORS.placeholderText}
                  />
              </View>
              {/* Ratinga */}
            </View>
          </View>
          </View>
         </ScrollView>
       </KeyboardAvoidingView>
  )
}

export default Create

const styles = StyleSheet.create({
  container:{},
  scrollView:{},
  card:{},
  header:{},
  title:{},
  subTitle:{},
  form:{},
  formGroup:{},
  label:{},
  inputContainer:{},
  inputIcon:{},
  input:{}
})