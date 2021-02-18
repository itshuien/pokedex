import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import useEvolutions from '../hooks/useEvolutions';

export default function PokemonEvolutions({ pokemonName }) {
  const { evolutions } = useEvolutions(pokemonName);

  return (
    <View>
      {evolutions.slice(1).map((evolution, index) => {
        const evolvesFrom = evolutions.find(item => item.name === evolution.evolvesFrom);

        return (
          <View key={index} style={styles.evolution}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#888' }}>#{evolvesFrom.fullId}</Text>
              <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>{evolvesFrom.name}</Text>
              <Image style={styles.image} resizeMethod="scale" source={{ uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${evolvesFrom.fullId}.png` }} />
            </View>
            <View style={styles.trigger}>
              {evolution.trigger === 'level-up' ? <Text>Lv {evolution.minLevel}</Text> : null}
              <Text>{evolution.trigger}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#888' }}>#{evolution.fullId}</Text>
              <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>{evolution.name}</Text>
              <Image style={styles.image} resizeMethod="scale" source={{ uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${evolution.fullId}.png` }} />
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  evolution: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  trigger: {
    alignItems: 'center',
    marginHorizontal: 24,
  },
  image: {
    width: 88,
    height: 88,
  }
})
