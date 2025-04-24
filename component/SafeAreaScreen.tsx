import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import COLORS from '@/constant/color'

const SafeAreaScreen = ({ children }: React.PropsWithChildren<{}>
  // const { children } = props as { children: React.ReactNode }
) => {
    const insets = useSafeAreaInsets()
  return (
    <View style={[styles.container,{ paddingTop: insets.top }]}>
      {children}
    </View>
  )
}

export default SafeAreaScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    }
})