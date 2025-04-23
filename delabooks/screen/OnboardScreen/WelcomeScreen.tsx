import { KeyboardAvoidingView,Image, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constant/color'

const WelcomeScreen = () => {
     return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View >
                <View>
                    <Image 
                    source={require("../../assets/images/book-cuate.png")}
                    resizeMode='contain'
                    style={{width:"100%", height:"100%"}}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Welcome to DelaBooks</Text>
                    <Text style={styles.subTitle}>
                        Discover thousands of books and manage your reading journey all in one place
                    </Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Ionicons
                            name="arrow-forward-outline"
                            size={30}
                            color={COLORS.primary}
                            // style={}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
     )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    title:{},
    subTitle:{}
})