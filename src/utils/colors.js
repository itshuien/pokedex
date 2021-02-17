import { POKEMON_TYPE_COLORS } from './constants';

export const getPokemonTypeColor = type => {
  return type in POKEMON_TYPE_COLORS
    ? POKEMON_TYPE_COLORS[type]
    : POKEMON_TYPE_COLORS.unknown;
}
