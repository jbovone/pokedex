import {
  cargarPokemon as cargarPokemonDeApi,
  cargarPokemones as cargarPokemonesDeApi,
} from "../api/pokemon.js";

import {
  cargarPokemon as cargarPokemonDeLocalStorage,
  cargarPokemones as cargarPokemonesDeLocalStorage,
  guardarPokemon,
  guardarPokemones,
} from "../storage/pokemon.js";
import {
  mapearListadoPokemones,
  mapearPokemon,
} from "../mapeadores/pokemon.js";
import Pokemon from "../entidades/pokemon.js";
import ListadoPokemones from "../entidades/listadoPokemones.js";

export const LIMITE_POKEMONES = 20;

export async function cargarPokemon(id: string) {
  if (id === undefined) {
    throw new Error("Se necesita un identificador para cargar un pokemón");
  }
  let pokemon: Pokemon;
  try {
    pokemon = cargarPokemonDeLocalStorage(id);
  } catch (e) {
    const pokemonData = await cargarPokemonDeApi(id);
    pokemon = mapearPokemon(pokemonData);
    guardarPokemon(id, pokemon);
  }

  return pokemon;
}

export async function cargarPokemones(
  offset = 0,
  limite = LIMITE_POKEMONES
): Promise<ListadoPokemones> {
  try {
    return cargarPokemonesDeLocalStorage(offset, limite);
  } catch (e) {
    const pokemonesData = await cargarPokemonesDeApi(offset, limite);
    const pokemones = mapearListadoPokemones(pokemonesData);
    guardarPokemones(offset, limite, pokemones);
    return pokemones;
  }
}
