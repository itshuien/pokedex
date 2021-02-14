import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function PokemonTypeLabel({ typeName, color }) {
  return (
    <View style={{ ...styles.container, backgroundColor: color }}>
      <Text style={styles.text}>{typeName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    opacity: 0.7,
  },
  text: {
    fontSize: 11,
    fontWeight: '500',
    color: '#ffffff',
  }
})
