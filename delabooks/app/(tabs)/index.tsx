import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URI } from '@/constant/app'
import { useAuthStore } from '@/store/authStore'
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constant/color';
import { formatPublishDate } from '@/lib/utils';
import Loader from '@/component/Loader';


interface  ItemUser {
  caption: string;
  createdAt: string;
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
  caption: string;
  createdAt: string;
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
  const fetchBooks =async(pageNum=1, refreshing=false) => {
    try {
      if(refreshing) setRefreshing(true)
        else if(pageNum === 1) setLoading(true)

        const res = await fetch(`${API_URI}/book/get-book?page=${pageNum}&limit=2`, {
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
        // setBooks((prev) => [...prev, ...data.books])

        /* The code snippet you provided is creating a new array `uniqueBooks` by combining the existing
        `books` array with the new `data.books` array fetched from the API response. Here's a breakdown of
        what the code is doing: */
        const uniqueBooks = 
          refreshing || pageNum === 1 
          ? data.books
          : Array.from(new Set([...books, ...data.books].map((book)=> book._id))).map((id)=> 
            [...books, ...data.books].find((book) => book._id === id));

        setBooks(uniqueBooks);
        setHasMore(pageNum < data.totalPages); // Optional: track if more books are available
        setPageNum(pageNum)
    } catch (error) {
      console.log("Error fetching books", error)
    } finally {
      if(refreshing) setRefreshing(false)
      else setLoading(false)
    }
  }

  useEffect(()=> {
    fetchBooks()
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
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>{formatPublishDate(item.createdAt)}</Text>
      </View>
    </View>
  )

  const handleLoadMore = async() => {
    if(hasMore && !loading && !refreshing){
        await fetchBooks(pageNum + 1)
    }
  }

  if(loading) return <Loader />

  return (
    <View style={styles.container}>
      <FlatList 
        data={books}
        renderItem={renderItem}
        keyExtractor={(item)=> item._id}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}

        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>BookWorm</Text>
            <Text style={styles.headerSubTitle}>Discover great reads from the community</Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator  style={styles.footerLoader} color={COLORS.primary} size="small" />
          ) :(
            null
          )
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons 
              name="book-outline"
              size={60}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <Text style={styles.emptySubText}>Be the first to share a book </Text>
          </View>
        }
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
  bookDetails:{},
  caption:{},
  date:{},
  header:{},
  headerTitle:{},
  headerSubTitle:{},
  emptyContainer:{},
  emptyText:{},
  emptySubText: {},
  footerLoader:{}
})