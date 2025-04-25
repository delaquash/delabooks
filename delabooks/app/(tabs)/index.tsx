import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const renderItem=({ item }) => {
    <View>

    </View>
  }

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
  username:{}
})