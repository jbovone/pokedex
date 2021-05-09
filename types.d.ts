interface IPokemon {
  id: string;
  nombre: string;
  foto: string;
  tipos: string[];
  habilidades: string[];
  movimientos: IMovimiento[];
}

interface IMovimiento {
  movimiento: string;
  versiones: string[];
}

interface itemPaginador {
  texto: string;
  isActive?: boolean;
  pagina?: string;
  isDisabled?: boolean;
}
