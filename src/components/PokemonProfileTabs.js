import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import PokemonProfileTabItem from '../components/PokemonProfileTabItem';
import PokemonBaseStats from '../components/PokemonBaseStats';
import PokemonEvolutions from '../components/PokemonEvolutions';

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
          setActiveTab={() => setActiveTab('basestats')}
          isActiveTab={isActiveTab('basestats')}
        />
        <PokemonProfileTabItem
          tabName="Moves"
          setActiveTab={() => setActiveTab('moves')}
          isActiveTab={isActiveTab('moves')}
        />
        <PokemonProfileTabItem
          tabName="Evolutions"
          setActiveTab={() => setActiveTab('evolutions')}
          isActiveTab={isActiveTab('evolutions')}
        />
      </View>

      <ScrollView style={styles.tabContent}>
        {isActiveTab('basestats') ? <PokemonBaseStats rawBaseStats={pokemon.stats} themeColor={themeColor} /> : null}
        {isActiveTab('evolutions') ? <PokemonEvolutions pokemonName={pokemon.name} /> : null}
        {isActiveTab('moves') ? <Text>moves content</Text> : null}
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
