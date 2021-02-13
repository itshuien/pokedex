import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function Home({ navigation }) {
  const [pokemons, setPokemons] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const getPokemons = async (url) => {
    const result = await axios.get(url || 'https://pokeapi.co/api/v2/pokemon');
    setPokemons(result.data.results);
    setPreviousUrl(result.data.previous);
    setNextUrl(result.data.next);
  }

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Pokemons</Text>

      <FlatList
        style={{ flexGrow: 1 }}
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('PokemonDetails', item)}>
            <Text style={styles.h3}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button title="Previous" onPress={() => getPokemons(previousUrl)} />
        <Button title="Next" onPress={() => getPokemons(nextUrl)} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 24
  },
  h3: {
    fontSize: 16,
    marginBottom: 20,
  },
})
