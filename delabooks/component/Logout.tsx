import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '@/constant/color'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '@/store/authStore'

const Logout = () => {
    const { logout } = useAuthStore()

    const confirmLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout", [
            {text: "Cancel", style:"cancel"},
            {text: "Logout", onPress:()=>logout(), style: "destructive"}
        ])
    }
  return (
   <TouchableOpacity style={styles.logoutButton}>
    <Ionicons name="log-out-outline" size={20} color={COLORS.white}/>
    <Text style={styles.logoutText}>Logout</Text>
   </TouchableOpacity>
  )
}

export default Logout

const styles = StyleSheet.create({
    logoutText:{},
    logoutButton:{}
})