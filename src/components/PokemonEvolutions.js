import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';

import { getEvolutionChain } from '../utils/pokedexApi';

export default function PokemonEvolutions({ pokemonName }) {
  const [evolutions, setEvolutions] = useState([]);

  const fetchEvolutionChain = async (source) => {
    const evolutionChain = await getEvolutionChain(source, pokemonName);
    setEvolutions(evolutionChain);
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchEvolutionChain(source);

    return () => {
      source.cancel('Cancel axios request');
    }
  }, []);

  return (
    <View style={styles.container}>
      {evolutions.map((evolution, index) => {
        return (
          <View key={index} style={styles.evolution}>
            <Text style={{ color: '#888' }}>#{evolution.fullId}</Text>
            <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>{evolution.name}</Text>
            <Image style={styles.image} resizeMethod="scale" source={{ uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${evolution.fullId}.png` }} />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  evolution: {
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 100,
    height: 100,
  }
})
