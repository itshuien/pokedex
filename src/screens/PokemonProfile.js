import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { pokemonTypeColors } from '../utils/colors';

import PokemonProfileImage from '../components/PokemonProfileImage';
import PokemonTypeLabel from '../components/PokemonTypeLabel';
import PokemonProfileTabs from '../components/PokemonProfileTabs';

export default function PokemonProfile({ route, navigation }) {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(null);
  const [themeColor, setThemeColor] = useState('');

  const getPokemon = async () => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    setPokemon(data);
  }
  
  useEffect(() => {
    getPokemon();
  }, []);

  useEffect(() => {
    const pokemonTypeColor = pokemon ? pokemonTypeColors[pokemon.types[0].type.name] : pokemonTypeColors.unknown;
    setThemeColor(pokemonTypeColor);

    if (pokemon) {
      const fullId = pokemon.id.toString().padStart(3, '0');
      setPokemonId(fullId);
    }
  }, [pokemon]);

  if (pokemon) {
    return (
      <SafeAreaView style={styles.container}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => navigation.navigate('Home')}
          style={{ marginBottom: 16 }}
        />

        <Text style={styles.pokemonId}>#{pokemonId}</Text>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>

        <View style={styles.types}>
          {pokemon.types.map(item => (
            <PokemonTypeLabel
              key={item.slot}
              typeName={item.type.name}
              color={pokemonTypeColors[item.type.name].medium}
            />
          ))}
        </View>

        {pokemonId ? <PokemonProfileImage pokemonId={pokemonId} themeColor={themeColor.light} /> : null}

        <PokemonProfileTabs pokemon={pokemon} themeColor={themeColor} />
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>Loading...</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get('screen').width
  },
  container: {
    padding: 16,
    flex: 1,
  },
  pokemonId: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  pokemonName: {
    color: '#333',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  types: {
    flexDirection: 'row',
    marginBottom: 16,
  },
})