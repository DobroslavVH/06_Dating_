import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const CustomIndicator = ({
  color,
  size = 'large'
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default CustomIndicator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})