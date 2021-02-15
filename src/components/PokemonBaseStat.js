import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PokemonBaseStat({ baseStat, fillColor }) {
  const baseStatDisplayNames = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed',
  }
  const baseStatMaxValue = 255;
  const baseStatPercentage = baseStat.value / baseStatMaxValue * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.baseStatName} >{baseStatDisplayNames[baseStat.name]}</Text>
      <Text style={styles.baseStatValue}>{baseStat.value}</Text>
      <View style={styles.baseStatBarTrack}>
        <View style={{ ...styles.baseStatBarFill, width: `${baseStatPercentage}%`, backgroundColor: fillColor }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  baseStatName: {
    width: '25%',
  },
  baseStatValue: {
    width: '15%',
  },
  baseStatBarTrack: {
    width: '60%',
    backgroundColor: '#eee',
    height: 8,
    borderRadius: 8,
  },
  baseStatBarFill: {
    height: '100%',
    borderRadius: 8,
  }
})
