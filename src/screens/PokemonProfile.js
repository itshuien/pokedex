import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPokemonTypeColor } from '../utils/colors';
import usePokemon from '../hooks/usePokemon';

import BackButton from '../components/BackButton';
import PokemonProfileImage from '../components/PokemonProfileImage';
import PokemonTypeLabel from '../components/PokemonTypeLabel';
import PokemonProfileTabs from '../components/PokemonProfileTabs';

export default function PokemonProfile({ route, navigation }) {
  const { name } = route.params;
  const { pokemon } = usePokemon(name);

  const [themeColor, setThemeColor] = useState('');

  const scrollY = useRef(new Animated.Value(0)).current;;

  useEffect(() => {
    if (!pokemon) return;

    const pokemonTypeColor = getPokemonTypeColor(pokemon.types[0].type.name);
    setThemeColor(pokemonTypeColor);
  }, [pokemon]);

  if (pokemon) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton onPress={() => navigation.pop()} />

        <Text style={styles.pokemonId}>#{pokemon.fullId}</Text>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>

        <View style={styles.types}>
          {pokemon.types.map(item => (
            <PokemonTypeLabel
              key={item.slot}
              typeName={item.type.name}
            />
          ))}
        </View>

        <Animated.ScrollView
          onScroll={Animated.event(          
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],  
            { useNativeDriver: true },
          )}
        >
          <PokemonProfileImage pokemonId={pokemon.fullId} themeColor={themeColor.light} scrollY={scrollY} />

          <PokemonProfileTabs pokemon={pokemon} themeColor={themeColor} scrollY={scrollY} />
        </Animated.ScrollView>
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