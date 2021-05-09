import Pokemon from "../entidades/pokemon.js";
import Movimiento from "../entidades/movimiento.js";
import ListadoPokemones from "../entidades/listadoPokemones.js";

export function mapearPokemon(datosApi: any): Pokemon {
  const {
    id,
    name: nombre,
    sprites: { front_default: foto },
    types: tipos,
    abilities: habilidades,
    moves: movimientos,
  } = datosApi;

  return new Pokemon(
    id,
    nombre,
    foto,
    tipos.map((item: any) => item.type.name),
    habilidades.map((item: any) => item.ability.name),
    movimientos.map(
      (item: any) =>
        new Movimiento(
          item.move.name,
          item.version_group_details.map((v: any) => v.version_group.name)
        )
    )
  );
}

export function mapearListadoPokemones(datosApi: any) {
  const {
    count: total,
    next: siguienteUrl,
    previous: anteriorUrl,
    results: resultados,
  } = datosApi;

  return new ListadoPokemones(
    total,
    siguienteUrl,
    anteriorUrl,
    resultados.map((pokemon: any) => pokemon.name)
  );
}
