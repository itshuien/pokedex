import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useEvolutions(pokemonName) {
  const [evolutions, setEvolutions] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const cancelTokenSource = axios.CancelToken.source();

  const fetchEvolutions = async () => {
    try {
      const { data: pokemonSpecies } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`, { cancelToken: cancelTokenSource.token });
      const { data: { chain } } = await axios.get(pokemonSpecies.evolution_chain.url, { cancelToken: cancelTokenSource.token });

      const evolutionChain = flattenEvolutionChain([chain]);

      const result = await Promise.all(evolutionChain.map(async evolution => {
        const details = await getPokemonDetails(evolution.name);
        return { ...evolution, ...details }
      }))

      setEvolutions(result);
    } catch(error) {
      if (!isFetching) return;
      setError(error);
    }
  }
  
  useEffect(() => {
    setIsFetching(true);
    fetchEvolutions();

    return () => {
      setIsFetching(false);
      cancelTokenSource.cancel();
    }
  }, [])

  return { evolutions, isFetching, error };
}

function flattenEvolutionChain(chain) {
  const traverseResult = [];
  traverseEvolutionChain(null, chain, 1);
  return traverseResult;

  function traverseEvolutionChain(evolvesFrom, evolutionChain, evolutionStage) {
    if (!evolutionChain.length) return evolutionChain;
  
    for (let item of evolutionChain) {
      const { species, evolution_details } = item;

      const data = {
        evolutionStage,
        evolvesFrom,
        name: species.name,
        trigger: evolution_details.length ? evolution_details[0].trigger.name : null,
        minLevel: evolution_details.length ? evolution_details[0].min_level : null,
        item: evolution_details.length ? evolution_details[0].item?.name : null,
      }
      traverseResult.push(data);
  
      traverseEvolutionChain(item.species.name, item.evolves_to, evolutionStage + 1);
    }
  }
}

async function getPokemonDetails(pokemonName) {
  const { data: { id } } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);

  return {
    id,
    fullId: id.toString().padStart(3, '0')
  }
}
