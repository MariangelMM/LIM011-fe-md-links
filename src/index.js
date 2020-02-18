const path = require('path');
const fs = require('fs');
const marked = require('marked');

const rutaAbsoluta = (ruta) => {
  const valor = path.isAbsolute(ruta);
  return valor;
};
const convertirAbsoluta = (ruta) => {
  const convertir = path.resolve(ruta);
  return convertir;
};

// console.log(convertirAbsoluta('README.md'));

const verificarSiEsArchivo = (ruta) => {
  const verifArchivo = fs.lstatSync(ruta);
  const archivo = verifArchivo.isFile();
  return archivo;
};

const verificarSiEsCarpeta = (ruta) => {
  const verifCarpeta = fs.lstatSync(ruta);
  const carpeta = verifCarpeta.isDirectory();
  return carpeta;
};

const esArchivoMD = (ruta) => {
  const esMD = path.extname(ruta);
  if (esMD === '.md') {
    return true;
  }
  return false;
};

const revisarDirectorio = (ruta) => {
  const directorio = fs.readdirSync(ruta);
  return directorio;
};

const buscarArchivoMD = (ruta) => {
  let arrayMD = [];
  if (verificarSiEsArchivo(ruta) === true && esArchivoMD(ruta) === true) {
    arrayMD.push(ruta);
  } if (verificarSiEsCarpeta(ruta) === true) {
    revisarDirectorio(ruta).forEach((elemento) => {
      const rutaAbs = path.join(ruta, elemento);
      const arrDeArchivosEncontrados = buscarArchivoMD(rutaAbs);
      arrayMD = arrayMD.concat(arrDeArchivosEncontrados);
    });
    return arrayMD;
  }
  return arrayMD;
};

const leerArchivo = (ruta) => {
  const leyendoArchivos = fs.readFileSync(ruta, 'utf-8');
  return leyendoArchivos;
};

const extraerLinksArchivos = (ruta) => {
  const links = [];
  const leyendo = buscarArchivoMD(ruta);
  leyendo.forEach((elemento) => {
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {
      links.push({
        href,
        text,
        file: ruta,
      });
    };
    marked(leerArchivo(elemento), { renderer });
  });
  return links;
};


const funciones = {
  exisRutaAbsoluta: rutaAbsoluta,
  converRutaAbsoluta: convertirAbsoluta,
  verificaArchivo: verificarSiEsArchivo,
  verificaCarpeta: verificarSiEsCarpeta,
  esUnArchivoMD: esArchivoMD,
  revisaDirectorio: revisarDirectorio,
  buscaArchivoMD: buscarArchivoMD,
  leeArchivos: leerArchivo,
  leyendoInfoArchivos: extraerLinksArchivos,
};

module.exports = funciones;
