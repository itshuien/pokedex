import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PokemonMoves({ moves }) {
  const [levelUpMoves, setLevelUpMoves] = useState([]);
  const [machineMoves, setMachineMoves] = useState([]);
  const categories = ['level-up', 'machine'];

  const categorizeMoves = () => {
    const result = {};

    for (const item of moves) {
      const method = item.version_group_details[0].move_learn_method.name;

      if (categories.includes(method)) {
        const move = {
          name: item.move.name,
          levelLearnedAt: item.version_group_details[0].level_learned_at
        }

        if (method in result) result[method].push(move);
        else result[method] = [move];
      }
    }

    result['level-up'].sort((a, b) => parseFloat(a.levelLearnedAt) - parseFloat(b.levelLearnedAt));

    setLevelUpMoves(result['level-up']);
    setMachineMoves(result['machine']);
  }

  useEffect(() => {
    categorizeMoves();
  }, []);

  return (
    <View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Moves Learned by Leveling Up</Text>
        <View style={{ flexDirection: 'row', marginVertical: 8, }}>
          <Text style={{ width: '30%' }}>Level</Text>
          <Text>Move</Text>
        </View>
        {levelUpMoves.map(move => (
          <View key={move.name} style={styles.levelUpMoveRow}>
            <Text style={{ width: '30%' }}>{move.levelLearnedAt}</Text>
            <Text>{move.name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  levelUpMoveRow: {
    flexDirection: 'row',
    marginBottom: 2,
  }
})
