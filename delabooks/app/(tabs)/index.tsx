import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'

interface  ItemUser {
  image: string
    user: {
      image: string;
      username: string;
      user: string;

  }
}

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [books, setBooks] = useState([])


  const renderItem=({ item }:{item: ItemUser}) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.image}} style={styles.avatar}/>
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>
      <View style={styles.bookImageContainer}>
        <Image style={styles.bookImage} source={{ uri:item.image }}  />
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
  bookImage:{}
})