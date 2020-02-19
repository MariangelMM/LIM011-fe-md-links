
const funciones = require('./functions');
const validaLinks = require('./validate');

const mdLinks = (path, options) => {
  const promesaMDLinks = new Promise((resolve) => {
    const rutaAbsoluta = funciones.convertirRutaAbsoluta(path);
    if (options === true) {
      validaLinks(rutaAbsoluta)
        .then((res) => resolve(res));
    } else {
      resolve(funciones.extraerLinksArchivos(rutaAbsoluta));
    }
  });
  return promesaMDLinks;
};

// mdLinks('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/', true)
//   .then((res) => console.log(res));


module.exports = mdLinks;
