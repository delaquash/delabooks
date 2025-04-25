import { KeyboardAvoidingView,Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react';
// @ts-ignore 
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constant/color';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'

const Create = () => {
  const router = useRouter();
  const [laoding, setLaoding] = useState(false)
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string|null>(null)
  const [title, setTitle] = useState("")
  const [rating, setRating] = useState(3)
  const [imagebase64, setImagebase64] = useState<string | null>(null)

  const handleImagePicker= async() => {
    try {
      // request permission if needed
      if(Platform.OS !== 'web'){
       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
       console.log({ status }) 
       if(status !== 'granted'){
        Alert.alert("Permission denied", "Please grant permission to access media library")
        return;
       }
      }

      // launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true
      })
      if(!result.canceled){
        setImage(result.assets[0].uri)

        // if base64 is available
        if(result.assets[0].base64){
          setImagebase64(result.assets[0].base64)
        } else {
          // if base64 is not available, convert to base 64
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { 
            encoding: FileSystem.EncodingType.Base64 
          });
          setImage(base64)
        }
      }
    } catch (error) {
      
    }
  }

  const RenderRatePicker =() => {
    const starRatings = [];

      for (let i = 1; i <= 5; i++) {
        starRatings.push(
          <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
            <Ionicons
              name={i <= rating ? "star" : "star-outline"}  
              size={24}
              color={i <= rating ? "#f4b400": COLORS.textSecondary}
          />
          </TouchableOpacity>
        )
    return (
      <View style={styles.ratingContainer}>{starRatings}</View>
    )
  }
  }
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
            {/* Book title */}
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
           
            </View>

            {/* Book rating */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Rating</Text>
              {RenderRatePicker()}
            </View>
              {/* Book Image */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Book Image</Text>
                <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.previewImage} />
                  ) :(
                    <View style={styles.placeHolderText}>
                      <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                      <Text style={styles.placeHolderText}>Tap to select image</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            {/* Book caption */}
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
  input:{},
  starButton:{},
  ratingContainer:{}, 
  imagePicker:{},
  image:{},
  previewImage:{},
  placeHolderText:{}
})