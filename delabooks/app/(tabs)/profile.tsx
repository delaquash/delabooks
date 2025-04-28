import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useRouter } from "expo-router";
import { API_URI } from '@/constant/app';
import { useAuthStore } from '@/store/authStore';
import ProfileHeader from '@/component/ProfileHeader';
import Logout from '@/component/Logout';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constant/color';

const Profile = () => {
  const router = useRouter()
  const [isLoading, setisLoading] = useState(true)
  const [book, setBook] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const { token } = useAuthStore()

  const fetchData = async (id: any) => {
    
    try {
      setisLoading(true)
      const res = await fetch (`${API_URI}/book/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data?.message || "Failed to fetch book")
      setBook(data)
    } catch (error) {
      console.error("Error in fetching books", error)
      Alert.alert("Error", "Failed to load books. Pull down to refresh.")
    } finally{
      setisLoading(false)
    }
  }

  useEffect((id)=> {
    fetchData(id)
  }, [])

  const RenderRatePicker =(rating: number) => {
        const starRatings = [];
    
          for (let i = 1; i <= 5; i++) {
            starRatings.push(
              // <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
                <Ionicons
                  key={i}
                  name={i <= rating ? "star" : "star-outline"}  
                  size={16}
                  style={{ marginRight: 2}}
                  color={i <= rating ? "#f4b400": COLORS.textSecondary}
              />
              // </TouchableOpacity>
            )
        return starRatings
      }
  }

  const renderItem = (item :any )=> (
    <View style={styles.bookItemList}>
      <Image style={styles.bookImage} source={ item.image }/>
      <View style={styles.bookInfo}>
        <View style={styles.bookTitle}>{item.title}</View>
        <View style={styles.ratingContainer}>{RenderRatePicker(item.rating)}</View>
        <Text style={styles.bookCaption} numberOfLines={3}>{item.caption}</Text>
        <Text style={}></Text>
      </View>
    </View>

  )


  return (
    <View style={styles.container}>
      <ProfileHeader />
      <Logout />

      {/* Your Recommendations */}
      <View style={styles.bookHeader}>
        <Text style={styles.bookTitle}>Your Recommendations</Text>
        <Text style={styles.bookCount}>{book.length} books</Text>
      </View>

      <FlatList 
        data={book}
        renderItem={renderItem}
        keyExtractor={( item ) => item?._id }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bookList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={50} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No recommendations yet...</Text>
            <TouchableOpacity style={styles.addButton} onPress={()=>router.push("/create")}>
              <Text style={styles.addButtonText}> Add Your First Book</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container:{},
  bookHeader:{},
  bookTitle:{},
  bookCount:{},
  bookList:{},
  emptyContainer:{},
  emptyText:{},
  addButtonText:{},
  addButton:{},
  bookItemList:{},
  bookImage:{},
  bookInfo:{},
  ratingContainer:{},
  bookCaption:{}
})