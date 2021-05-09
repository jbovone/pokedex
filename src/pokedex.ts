import { cargarPokemon, cargarPokemones } from "./servicios/pokemon.js";
import {
  actualizarTextoAyuda,
  actualizarTextoIndicePokemones,
  mostrarListadoPokemones,
  mostrarPaginador,
  mostrarPokemon,
  mostrarTotalPokemones,
} from "./ui/index.js";

const pokemonesPorPagina = 20;

async function cambiarPagina(pagina: number) {
  const offset = pokemonesPorPagina * (pagina - 1);
  actualizarTextoIndicePokemones("Cargando...");
  const listadoPokemones = await cargarPokemones(offset, pokemonesPorPagina);
  console.log(listadoPokemones, "LISTADO");
  const totalPaginas = Math.ceil(listadoPokemones.total / pokemonesPorPagina);
  mostrarTotalPokemones(listadoPokemones.total + "");
  mostrarListadoPokemones(listadoPokemones.nombresPokemones, async (nombre) => {
    actualizarTextoAyuda("Cargando...");
    mostrarPokemon(await cargarPokemon(nombre));
  });

  mostrarPaginador(
    totalPaginas,
    pagina,
    Boolean(listadoPokemones.siguienteUrl),
    Boolean(listadoPokemones.anteriorUrl),
    cambiarPagina
  );
}

export default function inicializar() {
  return cambiarPagina(1).catch((e) => console.error(e));
}
