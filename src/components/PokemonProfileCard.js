import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { pokemonTypeColors } from '../utils/colors';
import axios from 'axios';

export default function PokemonProfileCard({ pokemonName, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [themeColor, setThemeColor] = useState('');

  const getPokemon = async (source) => {
    try {
      const { data: { id, name, types } } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`, { cancelToken: source.token });
      const fullId = id.toString().padStart(3, '0');
      setPokemon({ id, name, types, fullId });
    } catch(e) {
      if (isLoading) return;
    }
  }
  
  useEffect(() => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    getPokemon(source);

    return () => {
      setIsLoading(false);
      source.cancel('Cancel axios request');
    }
  }, []);

  useEffect(() => {
    const pokemonTypeColor = pokemon ? pokemonTypeColors[pokemon.types[0].type.name] : pokemonTypeColors.unknown;
    setThemeColor(pokemonTypeColor);
  }, [pokemon]);

  if (pokemon) {
    return (
      <TouchableOpacity
        style={{ ...styles.container, backgroundColor: themeColor.light }}
        onPress={() => navigation.navigate('PokemonDetails', pokemon)}
      >
        <View style={styles.content}>
          <Text style={styles.pokemonId}>#{pokemon.fullId}</Text>
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} resizeMethod="scale" source={{ uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.fullId}.png` }} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{  ...styles.container, backgroundColor: '#ededed' }} />
  )
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 24,
  },
  pokemonId: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -1,
  },
  image: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    opacity: 0.7,
    bottom: '-20%',
    right: '-30%',
  }
})
