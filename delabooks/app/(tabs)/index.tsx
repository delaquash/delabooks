import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { API_URI } from '@/constant/app'
import { useAuthStore } from '@/store/authStore'
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constant/color';


interface  ItemUser {
  _id: string;
  rating: number;
  image: string;
  title: string;
    user: {
      image: string;
      username: string;
      user: string;

  }
}

interface Book {
  _id: string;
  image: string;
  title: string;
  description?: string;
  rating: number;  // Added this property
  user: {
    image: string;
    username: string;
    user: string;
  };
}

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [books, setBooks] = useState<Book[]>([])
  const [rating, setRating] = useState(3)

  const { token } = useAuthStore()
  const fetchBooks =async() => {
    try {
      if(refreshing) setRefreshing(true)
        else if(pageNum === 1) setLoading(true)

        const res = await fetch(`${API_URI}/book/get-book?page=${pageNum}&limit=5`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()
        if(!res.ok) throw new Error(data.message || "Fail to fetch books")

       /* `setBooks((prev) => [...prev, ...data.books])` is updating the state of the `books` array by
       adding new books fetched from the API response to the existing books array. */
        setBooks((prev) => [...prev, ...data.books])
        setHasMore(pageNum < data.totalPages); // Optional: track if more books are available
        setPageNum(pageNum)
    } catch (error) {
      console.error("Error fetching books", error)
    } finally {
      if(refreshing) setRefreshing(false)
      else setLoading(false)
    }

  }

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

  const renderItem=({ item }:{item: ItemUser}) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.image}} style={styles.avatar}/>
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>
      <View style={styles.bookImageContainer}>
        <Image style={styles.bookImage} source={item.image}  contentFit='cover'/>
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.BookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{RenderRatePicker(item.rating)}</View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList 
        data={books}
        renderItem={renderItem}
        keyExtractor={(item)=> item._id}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {},
  contentContainer:{},
  bookCard:{},
  bookHeader:{},
  userInfo:{},
  avatar:{},
  username:{},
  bookImageContainer:{},
  bookImage:{},
  ratingContainer:{},
  starButton:{},
  BookTitle:{},
  bookDetails:{}
})