export function obtenerParametrosDeURL(url: string) {
  return {
    offset: Number(/limit=([0-9]+)/gi.exec(url)?.pop()),
    limit: Number(/offset=([0-9]+)/gi.exec(url)?.pop()),
  };
}
