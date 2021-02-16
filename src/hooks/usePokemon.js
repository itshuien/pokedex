import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePokemon(name) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const cancelTokenSource = axios.CancelToken.source();

  const fetchPokemon = async () => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`, {
        cancelToken: cancelTokenSource.token
      });
      const fullId = data.id.toString().padStart(3, '0');
      setPokemon({ ...data, fullId });
    } catch(error) {
      if (!isFetching) return;
      setError(error);
    }
  }

  useEffect(() => {
    setIsFetching(true);
    fetchPokemon();

    return () => {
      setIsFetching(false);
      cancelTokenSource.cancel();
    }
  }, []);

  return { pokemon, error };
}
