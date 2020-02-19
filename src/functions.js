const path = require('path');
const fs = require('fs');
const marked = require('marked');

const esRutaAbsoluta = (ruta) => {
  const esAbsoluta = path.isAbsolute(ruta);
  return esAbsoluta;
};
const convertirRutaAbsoluta = (ruta) => {
  const convertirAb = path.resolve(ruta);
  return convertirAb;
};

const verificarSiEsArchivo = (ruta) => {
  const verifArchivo = fs.lstatSync(ruta);
  const esArchivo = verifArchivo.isFile();
  return esArchivo;
};

const verificarSiEsCarpeta = (ruta) => {
  const verifCarpeta = fs.lstatSync(ruta);
  const esCarpeta = verifCarpeta.isDirectory();
  return esCarpeta;
};

const esArchivoMardown = (ruta) => {
  const esMardown = path.extname(ruta);
  if (esMardown === '.md') {
    return true;
  }
  return false;
};

const revisarDirectorio = (ruta) => {
  const arrayDirectorio = fs.readdirSync(ruta);
  return arrayDirectorio;
};

const buscarArchivoMardown = (ruta) => {
  let arrayArchivosMardown = [];
  if (verificarSiEsArchivo(ruta) === true && esArchivoMardown(ruta) === true) {
    arrayArchivosMardown.push(ruta);
  } if (verificarSiEsCarpeta(ruta) === true) {
    revisarDirectorio(ruta).forEach((elemento) => {
      const rutaAbsoluta = path.join(ruta, elemento);
      const arrDeArchivosEncontrados = buscarArchivoMardown(rutaAbsoluta);
      arrayArchivosMardown = arrayArchivosMardown.concat(arrDeArchivosEncontrados);
    });
    return arrayArchivosMardown;
  }
  return arrayArchivosMardown;
};

const leerContenidoArchivoMardown = (ruta) => {
  const InfContieneArchivo = fs.readFileSync(ruta, 'utf-8');
  return InfContieneArchivo;
};

const extraerLinksArchivos = (ruta) => {
  const arrayLinks = [];
  const buscaArchivosMD = buscarArchivoMardown(ruta);
  buscaArchivosMD.forEach((elemento) => {
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {
      arrayLinks.push({
        href,
        text,
        file: ruta,
      });
    };
    marked(leerContenidoArchivoMardown(elemento), { renderer });
  });
  return arrayLinks;
};


const funciones = {
  esRutaAbsoluta,
  convertirRutaAbsoluta,
  verificarSiEsArchivo,
  verificarSiEsCarpeta,
  esArchivoMardown,
  revisarDirectorio,
  buscarArchivoMardown,
  leerContenidoArchivoMardown,
  extraerLinksArchivos,
};

module.exports = funciones;
