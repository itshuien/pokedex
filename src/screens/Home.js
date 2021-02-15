import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import PokemonProfileCard from '../components/PokemonProfileCard';

export default function Home({ navigation }) {
  const [pokemons, setPokemons] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const pokemonFlatListRef = useRef();

  const resetUrls = () => {
    setPreviousUrl(null);
    setNextUrl(null);
    getPokemons();
  }

  const goToPage = url => {
    getPokemons(url);
    pokemonFlatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  }

  const getPaginatorButtonColor = buttonType => {
    const isActive = buttonType === 'previous' ? previousUrl : nextUrl;
    return isActive ? '#237eed' : '#aaa';
  }

  const getPokemons = async (url) => {
    const result = await axios.get(url || 'https://pokeapi.co/api/v2/pokemon/?limit=50');
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

      <View style={styles.paginator}>
        <TouchableOpacity style={styles.paginatorButton} onPress={() => goToPage(previousUrl)}>
          <Text style={{ ...styles.paginatorButtonText, color: getPaginatorButtonColor('previous') }}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paginatorButton} onPress={() => goToPage(nextUrl)}>
          <Text style={{ ...styles.paginatorButtonText, color: getPaginatorButtonColor('next') }}>Next</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={pokemonFlatListRef}
        style={styles.flatList}
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
    flex: 1,
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  h3: {
    fontSize: 16,
    marginBottom: 20,
  },
  paginator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  paginatorButton: {
    paddingVertical: 8,
  },
  paginatorButtonText: {
    fontSize: 16,
  },
  flatList: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 16,
  }
})
