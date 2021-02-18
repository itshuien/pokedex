import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function PokemonEvolution({ evolution, evolvesFrom }) {
  return (
    <View style={styles.container}>
      <View style={styles.pokemon}>
        <Image style={styles.image} resizeMethod="scale" source={{ uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${evolvesFrom.fullId}.png` }} />
        <Text style={styles.id}>#{evolvesFrom.fullId}</Text>
        <Text style={styles.name}>{evolvesFrom.name}</Text>
      </View>
      <View style={styles.trigger}>
        <AntDesign name="arrowright" size={16} style={{ marginBottom: 8, color: '#ccc' }} />
        {evolution.trigger === 'level-up' ? <Text>{evolution.minLevel ? `lv ${evolution.minLevel}` : 'level up'}</Text>: null}
        {evolution.trigger === 'use-item' ? <Text style={{ textAlign: 'center' }}>{evolution.item}</Text> : null}
        {!['level-up', 'use-item'].includes(evolution.trigger) ? <Text>{evolution.trigger}</Text> : null}
      </View>
      <View style={styles.pokemon}>
        <Image style={styles.image} resizeMethod="scale" source={{ uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${evolution.fullId}.png` }} />
        <Text style={styles.id}>#{evolution.fullId}</Text>
        <Text style={styles.name}>{evolution.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginHorizontal: 16,
  },
  pokemon: {
    width: '40%',
    alignItems: 'center',
  },
  image: {
    width: 88,
    height: 88,
  },
  id: {
    color: '#888',
  },
  name: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  trigger: {
    width: '20%',
    alignItems: 'center',
    marginHorizontal: 24,
  },
})
