export default class ListadoPokemones {
  constructor(
    public total: number,
    public siguienteUrl: string | null,
    public anteriorUrl: string | null,
    public nombresPokemones: IPokemon["nombre"][]
  ) {}
}
