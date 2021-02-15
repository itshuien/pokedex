import React from 'react';

import PokemonBaseStat from '../components/PokemonBaseStat';

export default function PokemonBaseStats({ rawBaseStats, themeColor }) {
  const baseStats = rawBaseStats.map(item => {
    return {
      name: item.stat.name,
      value: item.base_stat
    }
  });

  return (
    <>
      {baseStats.map(baseStat => (
        <PokemonBaseStat
          key={baseStat.name}
          baseStat={{ name: baseStat.name, value: baseStat.value }}
          fillColor={themeColor.medium}
        />
      ))}
    </>
  )
}
