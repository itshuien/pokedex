import React, { useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import PokemonProfileTabItem from '../components/PokemonProfileTabItem';
import PokemonBaseStats from '../components/PokemonBaseStats';
import PokemonEvolutions from '../components/PokemonEvolutions';
import PokemonMoves from '../components/PokemonMoves';

export default function PokemonProfileTabs({ pokemon, themeColor, scrollY }) {
  const [activeTab, setActiveTab] = useState('basestats');

  const isActiveTab = tabName => {
    return activeTab === tabName;
  }

  const translateY = scrollY.interpolate({
    inputRange: [0, 250, Number.MAX_SAFE_INTEGER],
    outputRange: [0, 0, Number.MAX_SAFE_INTEGER - 250],
    extrapolate: 'clamp'
  });

  return (
    <>
      <Animated.View
        style={{
          ...styles.tabs,
          transform: [{ translateY }],
        }}
      >
        <PokemonProfileTabItem
          tabName="Base Stats"
          iconName="chart-bar"
          setActiveTab={() => setActiveTab('basestats')}
          isActiveTab={isActiveTab('basestats')}
        />
        <PokemonProfileTabItem
          tabName="Moves"
          iconName="sword-cross"
          setActiveTab={() => setActiveTab('moves')}
          isActiveTab={isActiveTab('moves')}
        />
        <PokemonProfileTabItem
          tabName="Evolutions"
          iconName="dna"
          setActiveTab={() => setActiveTab('evolutions')}
          isActiveTab={isActiveTab('evolutions')}
        />
      </Animated.View>

      <View style={styles.tabContent}>
        {isActiveTab('basestats') ? <PokemonBaseStats rawBaseStats={pokemon.stats} themeColor={themeColor} /> : null}
        {isActiveTab('evolutions') ? <PokemonEvolutions pokemonName={pokemon.name} /> : null}
        {isActiveTab('moves') ? <PokemonMoves moves={pokemon.moves} /> : null}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 16,
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  tabContent: {
    zIndex: -1,
    padding: 8,
  }
})
