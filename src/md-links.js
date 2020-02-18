
const funciones = require('../src/index');
const valida = require('../src/validar');

const mdLinks = (path, options) => {
  const promesaMDLinks = new Promise((resolve) => {
    const rutaAb = funciones.converRutaAbsoluta(path);
    if (options === true) {
      valida.validaLinks(rutaAb)
        .then((res) => resolve(res));
    } else {
      resolve(funciones.leyendoInfoArchivos(rutaAb));
    }
  });
  return promesaMDLinks;
};

// mdLinks('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/', true)
//   .then((res) => console.log(res));


const mdLink = {
  mdLinks,
};

module.exports = mdLink;
