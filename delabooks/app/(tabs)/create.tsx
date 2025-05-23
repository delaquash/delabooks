import { KeyboardAvoidingView,Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
// @ts-ignore 
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constant/color';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import { API_URI } from '@/constant/app';
import { useAuthStore } from '@/store/authStore';

const Create = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [rating, setRating] = useState(3)
  const [imagebase64, setImagebase64] = useState<string | null>(null)

  const { token } = useAuthStore()
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
          setImagebase64(base64)
        }
      }
    } catch (error) {
      console.error("TError picking image", error)
      Alert.alert("Error", "There was a problem selecting your image")
    }
  }
const handleSubmit= async() => {
  if(!title || !caption || !image || !rating){
    Alert.alert("Error", "Please fill all fields")
    return;
  }
  try {
    setLoading(true);
    // get the file extension
// Split the image URI (e.g., 'photo.png') into parts using '.' as the separator
const uriParts = image.split(".");

// Get the last part of the array, which should be the file extension (e.g., 'png', 'jpg')
const fileType = uriParts[uriParts.length - 1];

// Construct the image MIME type, defaulting to 'image/jpeg' if fileType is falsy
const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";

// Create a base64 data URL using the MIME type and the actual base64 image string
const imageDataUrl = `data:${imageType};base64,${imagebase64}`;

const res = await fetch (`${API_URI}/book/register-book`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify( {
        image: imageDataUrl,
        rating: rating.toString(),
        caption,
        title
      })
  })
  const data = await res.json()
  if(!res.ok) throw new Error(data?.message || "Failed to create book")
    Alert.alert("Success", "Book created successfully")
    setTitle("")
    setCaption("")
    setRating(3)
    setImage(null)
    setImagebase64(null)
    router.push("/")
  } catch (error) {
    console.error("Error creating book", error)
    Alert.alert("Error", "There was a problem creating your book")
  } finally {
    setLoading(false)
    
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
            <View style={styles.formGroup}>
                <Text style={styles.label}> Caption</Text>
                <TextInput 
                  style={styles.textArea}
                  placeholder='Write your review about this book'
                  placeholderTextColor={COLORS.placeholderText}
                  value={caption}
                  onChangeText={setCaption}
                  multiline
                />
            </View>

            {/* SuBMIT */}
            <TouchableOpacity disabled={loading} onPress={handleSubmit} style={styles.button}>
              {loading ? (
                <ActivityIndicator color={COLORS.white}/>
              ) : (
                <>
                  <Ionicons 
                    name="cloud-upload-outline"
                    size={25}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>
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
  placeHolderText:{},
  textArea:{},
  buttonIcon:{},
  buttonText:{},
  button:{}
})