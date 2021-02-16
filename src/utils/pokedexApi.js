import axios from 'axios';

export async function getEvolutionChain(source, pokemonName) {
  const { data: pokemonSpecies } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`, { cancelToken: source.token });
  const { data: { chain } } = await axios.get(pokemonSpecies.evolution_chain.url, { cancelToken: source.token });

  const evolutionChain = flattenEvolutionChain(chain);

  const newEvolutionChain = await Promise.all(evolutionChain.map(async evolution => {
    const details = await getEvolutionDetails(evolution.name);
    return { ...evolution, ...details }
  }))

  return newEvolutionChain;
}

function flattenEvolutionChain(chain) {
  const traverseResult = [];
  traverseEvolutionChain([ chain ], 1);
  return traverseResult;

  function traverseEvolutionChain(currentEvolution, level) {
    if (!currentEvolution.length) return currentEvolution;
  
    for (let item of currentEvolution) {
      const data = { name: item.species.name, level }
      traverseResult.push(data);
  
      traverseEvolutionChain(item.evolves_to, level + 1);
    }
  }
}

async function getEvolutionDetails(pokemonName) {
  const { data: { id } } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);

  return {
    id,
    fullId: id.toString().padStart(3, '0')
  }
}
