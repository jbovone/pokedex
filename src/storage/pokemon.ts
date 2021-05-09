import ListadoPokemones from "../entidades/listadoPokemones.js";

export const LIMITE_POKEMONES = 20;

function obtenerKeyPokemon(id: string) {
  return `pokemon_${id}`;
}

function obtenerKeyPokemones(offset: number, limite: number) {
  return `pokemones_${offset}_${limite}`;
}

export function cargarPokemon(id: string) {
  if (id === undefined) {
    throw new Error("Se necesita un identificador para cargar un pokemón");
  }

  const pokemon = localStorage.getItem(obtenerKeyPokemon(id));
  if (pokemon === null) {
    throw new Error(`Pokemon con id ${id} no encontrado`);
  }

  return JSON.parse(pokemon);
}

export function cargarPokemones(offset = 0, limite = LIMITE_POKEMONES) {
  const pokemones = localStorage.getItem(obtenerKeyPokemones(offset, limite));
  if (pokemones === null) {
    throw new Error(
      `Listado de pokemones con offset ${offset} y limite ${limite} no encontrado`
    );
  }
  return JSON.parse(pokemones);
}

export function guardarPokemon(id: string, pokemon: IPokemon) {
  if (id === undefined || typeof pokemon !== "object") {
    throw new Error(
      "Se necesita un identificador y un pokemon para guardar en localStorage"
    );
  }
  localStorage.setItem(obtenerKeyPokemon(id), JSON.stringify(pokemon));
}

export function guardarPokemones(
  offset: number,
  limite: number,
  pokemones: ListadoPokemones
) {
  if (
    offset === undefined ||
    limite === undefined ||
    !(pokemones instanceof ListadoPokemones)
  ) {
    throw new Error("Se necesita offset, limite y pokemones");
  }

  localStorage.setItem(
    obtenerKeyPokemones(offset, limite),
    JSON.stringify(pokemones)
  );
}
