import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import PokemonProfileCard from '../components/PokemonProfileCard';

export default function Home({ navigation }) {
  const [pokemons, setPokemons] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const resetUrls = () => {
    setPreviousUrl(null);
    setNextUrl(null);
    getPokemons();
  }

  const getPokemons = async (url) => {
    const result = await axios.get(url || 'https://pokeapi.co/api/v2/pokemon/');
    setPokemons(result.data.results);
    setPreviousUrl(result.data.previous);
    setNextUrl(result.data.next);
  }

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={resetUrls}>
        <Text style={styles.h1}>Pokemons</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button title="Previous" onPress={() => getPokemons(previousUrl)} disabled={previousUrl === null} />
        <Button title="Next" onPress={() => getPokemons(nextUrl)} disabled={nextUrl === null} />
      </View>

      <FlatList
        style={{ flexGrow: 1, flex: 1 }}
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
          <PokemonProfileCard key={item.id} pokemonName={item.name} navigation={navigation} />
        )}
        columnWrapperStyle={{ justifyContent:'space-between' }}
        numColumns={2}
      />
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
    marginVertical: 24,
  },
  h3: {
    fontSize: 16,
    marginBottom: 20,
  },
})
