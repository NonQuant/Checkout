import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: "Profile"}} />
        <Stack.Screen name="about" options={{ }} />
    </Stack>
  )
}

export default Layout