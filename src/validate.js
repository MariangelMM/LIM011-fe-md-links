const fetch = require('node-fetch');
const funciones = require('./functions');

const validarLinks = (ruta) => {
  const arraylinksValidados = [];
  funciones.extraerLinksArchivos(ruta).forEach((elemento) => {
    arraylinksValidados.push(fetch(elemento.href)
      .then((res) => {
        let mensaje;
        if (res.status >= 200 && res.status < 400) {
          mensaje = 'ok';
        }
        if (res.status >= 400) {
          mensaje = 'fail';
        }
        const obj = {
          status: res.status,
          message: mensaje,
          href: elemento.href,
          text: elemento.text,
          file: elemento.file,
        };
        return obj;
      }));
  });
  return Promise.all(arraylinksValidados);
};


// Promise.all(validarLinks('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md'))
//   .then((res) => console.log(res));

module.exports = validarLinks;
