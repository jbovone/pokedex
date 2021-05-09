export default class Pokemon implements IPokemon {
  constructor(
    public id: string,
    public nombre: string,
    public foto: string,
    public tipos: string[],
    public habilidades: string[],
    public movimientos: IMovimiento[]
  ) {}
}
