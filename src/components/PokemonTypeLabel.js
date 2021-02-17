import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getPokemonTypeColor } from '../utils/colors';

export default function PokemonTypeLabel({ typeName }) {
  return (
    <View style={{ ...styles.container, backgroundColor: getPokemonTypeColor(typeName).medium }}>
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
    opacity: 0.9,
  },
  text: {
    fontSize: 11,
    fontWeight: '500',
    color: '#ffffff',
  }
})
