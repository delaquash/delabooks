import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthProvider } from './AuthProvider'
import { useAuthStore } from '@/store/authStore'
import { Image } from 'expo-image'
import { formatMemberSince } from '@/lib/utils'

const ProfileHeader = () => {
    const { user } = useAuthStore()
    if(!user) return null;
  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user?.profileImage}} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.memberSince}>Joined {formatMemberSince(user?.createdAt)}</Text>
      </View>
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
    profileHeader:{},
    profileImage:{},
    profileInfo:{},
    username:{},
    email:{},
    memberSince:{}
})