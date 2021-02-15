import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PokemonProfileTabItem({ tabName, setActiveTab, isActiveTab }) {
  const getTabColor = () => {
    return { color: isActiveTab ? '#333' : '#aaa' };
  }

  return (
    <TouchableOpacity style={styles.tab} onPress={setActiveTab}>
      <MaterialCommunityIcons name="chart-bar" size={24} style={[styles.tabIcon, getTabColor()]} />
      <Text style={[styles.tabTitle, getTabColor()]}>{tabName}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    flex: 1/3,
    marginHorizontal: 8
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
})
