import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { pokemonTypeColors } from '../utils/colors';

import PokemonProfileImage from '../components/PokemonProfileImage';
import PokemonTypeLabel from '../components/PokemonTypeLabel';

export default function PokemonDetails({ route, navigation }) {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(null);
  const [themeColor, setThemeColor] = useState('');
  const [activeTab, setActiveTab] = useState('basestats');

  const isActiveTab = tabName => {
    return activeTab === tabName;
  }

  const getPokemon = async () => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    setPokemon(data);
  }
  
  useEffect(() => {
    getPokemon();
  }, []);

  useEffect(() => {
    const pokemonTypeColor = pokemon ? pokemonTypeColors[pokemon.types[0].type.name] : pokemonTypeColors.unknown;
    setThemeColor(pokemonTypeColor.normal);

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
              color={pokemonTypeColors[item.type.name].normal}
            />
          ))}
        </View>

        {pokemonId ? <PokemonProfileImage pokemonId={pokemonId} themeColor={themeColor} /> : null}

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('basestats')}>
            <Text style={isActiveTab('basestats') ? styles.activeTab : styles.inactiveTab}>Base Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('evolution')}>
            <Text style={isActiveTab('evolution') ? styles.activeTab : styles.inactiveTab}>Evolution</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('moves')}>
            <Text style={isActiveTab('moves') ? styles.activeTab : styles.inactiveTab}>Moves</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContent}>
          {isActiveTab('basestats') ? <Text>base stats content</Text> : null}
          {isActiveTab('evolution') ? <Text>evolution content</Text> : null}
          {isActiveTab('moves') ? <Text>moves content</Text> : null}
        </View>

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
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 16,
  },
  activeTab: {
    fontWeight: '500'
  },
  inactiveTab: {
    color: '#666'
  },
  tabContent: {
    padding: 16
  }
})