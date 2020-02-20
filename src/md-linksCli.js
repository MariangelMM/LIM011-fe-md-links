const fs = require('fs');
const mdlinks = require('./md-links');
const stats = require('./stats');


const funcionCli = (ruta, opcion, opcion2) => {
  if (fs.existsSync(ruta)) {
    if ((opcion === '--stats' && opcion2 === '--validate') || (opcion === '--validate' && opcion2 === '--stats')) {
      return mdlinks(ruta, true)
        .then((resp) => stats.statsValidado(resp))
        .then((res) => {
          const string = `Total: ${res.Total}\nUnique: ${res.Unique}\nBroken: ${res.Broken}`;
          return string;
        });
    }
    if (opcion === '--validate') {
      return mdlinks(ruta, true)
        .then((res) => {
          let validLinks = '';
          res.forEach((elemento) => {
            validLinks += `File:${elemento.file} Href:${elemento.href} Mensaje:${elemento.message} Estatus:${elemento.status} Texto:${elemento.text}\n`;
          });
          return validLinks;
        });
    }
    if (opcion === '--stats') {
      return mdlinks(ruta, true)
        .then((resp) => stats.stats(resp))
        .then((res) => {
          const string = `Total: ${res.Total}\nUnique: ${res.Unique}`;
          return string;
        });
    }
    return mdlinks(ruta, false)
      .then((res) => {
        let validLink = '';
        res.forEach((elemento) => {
          validLink += `File:${elemento.file} Href:${elemento.href} Texto:${elemento.text} \n`;
        });
        return validLink;
      });
  } return new Promise((reject) => {
    reject('Ingrese una ruta valida');
  });
};

module.exports = funcionCli;
