import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

export default function PokemonDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        style={{ marginBottom: 16 }}
      />

      <View>
        <Text style={{ ...styles.title, color: '#333' }}>Pokemon Details</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
})
