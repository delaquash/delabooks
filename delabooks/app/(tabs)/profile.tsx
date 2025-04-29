import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useRouter } from "expo-router";
import { API_URI } from '@/constant/app';
import { useAuthStore } from '@/store/authStore';
import ProfileHeader from '@/component/ProfileHeader';
import Logout from '@/component/Logout';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constant/color';
import { Book } from '@/global';
import { formatPublishDate } from '@/lib/utils';

const Profile = () => {
  const router = useRouter()
  const [isLoading, setisLoading] = useState(true)
  const [book, setBook] = useState([])
  const [refreshing, setRefreshing] = useState(false)
    const [books, setBooks] = useState<Book[]>([])
    const [deleteBookId, setDeleteBookId] = useState<string | null>(null)

  const { token, user } = useAuthStore()
  const userId = user?.id
  const fetchData = async (userId: string) => {
    
    try {
      setisLoading(true)
      const res = await fetch (`${API_URI}/book/user/${userId}`, {
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

  useEffect(() => {
    if (userId) fetchData(userId);
  }, [userId]);

  const RenderRatePicker = (rating: number) => {
    const starRatings = [];
    
    for (let i = 1; i <= 5; i++) {
      starRatings.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}  
          size={16}
          style={{ marginRight: 2 }}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
        />
      );
    }
    
    return starRatings;
  };

   const handleDelete = async(bookId: string) => {
      Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => handleDeleteConfirm(bookId), style: "destructive" }
      ])
    }
  
    const handleDeleteConfirm = async(bookId: string) => {
      try {
        setDeleteBookId(bookId)
        const res = await fetch(`${API_URI}/book/delete-book/${bookId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()
        if(!res.ok) throw new Error(data.message || "Fail to delete book")
          setBooks(books.filter((book)=> book._id !== bookId))
        Alert.alert("Success", "Book deleted successfully")
      } catch (error: any) {
        console.log("Error deleting book", error)
        Alert.alert("Error:", error.message || "Failed to delete book")
        
      } finally {
        setDeleteBookId(null)
      }
    }
  

  const renderItem = (item :any )=> (
    <View style={styles.bookItemList}>
      <Image style={styles.bookImage} source={ item.image }/>
      <View style={styles.bookInfo}>
        <View style={styles.bookTitle}>{item.title}</View>
        <View style={styles.ratingContainer}>{RenderRatePicker(item.rating)}</View>
        <Text style={styles.bookCaption} numberOfLines={3}>{item.caption}</Text>
        <Text style={styles.date}>{formatPublishDate(item.createdAt)}</Text>
        {/* <Text style={}></Text> */}
      </View>
        <TouchableOpacity style={styles.deleteButton} onPress={()=> handleDelete(item._id)}>
              {deleteBookId === item._id ? (
                <ActivityIndicator size="small" color={COLORS.primary}/>
              ) : (
                <Ionicons name="trash-outline" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
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
  bookCaption:{},
  deleteButton:{}, 
  date:{}
})