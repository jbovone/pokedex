function crearItemPaginador({
  texto,
  pagina,
  isActive = false,
  isDisabled = false,
}: itemPaginador) {
  const $item = document.createElement("li");
  $item.className = `page-item ${
    isDisabled ? "disabled" : isActive ? "active" : ""
  }`;
  const $link = document.createElement("button");
  $link.className = "page-link";
  isDisabled && $link.setAttribute("disabled", "disabled");
  $link.textContent = texto;
  $link.dataset["pagina"] = pagina ? pagina : texto;
  $item.appendChild($link);
  return $item;
}

export function manejarCambioPagina(
  e: MouseEvent,
  callbackPaginaSeleccionada: (pagina: number | string) => void
) {
  const target = e.target as HTMLAnchorElement;
  if (target.tagName !== "BUTTON") return;
  const numeroPagina = Number(target.dataset["pagina"]!);
  callbackPaginaSeleccionada(numeroPagina);
}

export default function mostrarPaginador(
  totalPaginas: number,
  paginaActual: number,
  urlSiguiente: boolean,
  urlAnterior: boolean,
  callbackPaginaSeleccionada: (...args: any) => void
) {
  const $paginador = document.querySelector<HTMLDivElement>("#paginador")!;
  $paginador.innerHTML = "";

  const $paginaAnterior = crearItemPaginador({
    texto: "Anterior",
    pagina: String(paginaActual - 1),
    isDisabled: !urlAnterior,
  });

  $paginador.appendChild($paginaAnterior);

  for (let i = 0; i < totalPaginas; i += 1) {
    const numeroPagina = i + 1;
    const $pagina = crearItemPaginador({
      texto: String(numeroPagina),
      isActive: numeroPagina === paginaActual,
    });
    $paginador.appendChild($pagina);
  }

  const $paginaSiguiente = crearItemPaginador({
    texto: "Siguiente",
    pagina: String(paginaActual + 1),
    isDisabled: !urlSiguiente,
  });
  $paginador.appendChild($paginaSiguiente);

  $paginador.onclick = (e) => {
    manejarCambioPagina(e, callbackPaginaSeleccionada);
  };
}
