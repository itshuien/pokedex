import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import PokemonProfileTabItem from '../components/PokemonProfileTabItem';
import PokemonBaseStats from '../components/PokemonBaseStats';
import PokemonEvolutions from '../components/PokemonEvolutions';
import PokemonMoves from '../components/PokemonMoves';

export default function PokemonProfileTabs({ pokemon, themeColor }) {
  const [activeTab, setActiveTab] = useState('basestats');

  const isActiveTab = tabName => {
    return activeTab === tabName;
  }

  return (
    <>
      <View style={styles.tabs}>
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
      </View>

      <ScrollView style={styles.tabContent}>
        {isActiveTab('basestats') ? <PokemonBaseStats rawBaseStats={pokemon.stats} themeColor={themeColor} /> : null}
        {isActiveTab('evolutions') ? <PokemonEvolutions pokemonName={pokemon.name} /> : null}
        {isActiveTab('moves') ? <PokemonMoves moves={pokemon.moves} /> : null}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
    marginBottom: 16,
  },
  tabContent: {
    padding: 8
  }
})
