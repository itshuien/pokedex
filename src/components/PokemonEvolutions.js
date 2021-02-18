import React from 'react';
import { View } from 'react-native';
import useEvolutions from '../hooks/useEvolutions';

import PokemonEvolution from './PokemonEvolution';

export default function PokemonEvolutions({ pokemonName }) {
  const { isFetching, evolutions } = useEvolutions(pokemonName);

  return (
    <View>
      {evolutions.slice(1).map((evolution, index) => {
        const evolvesFrom = evolutions.find(item => item.name === evolution.evolvesFrom);

        return (
          <PokemonEvolution
            key={index}
            evolution={evolution}
            evolvesFrom={evolvesFrom}
          />
        )
      })}
    </View>
  )
}
