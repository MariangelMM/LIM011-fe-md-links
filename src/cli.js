#!/usr/bin/env node

const cli = require('../src/md-linksCli');

const ruta = process.argv[2];

const options = process.argv[3];

const statsValidado = process.argv[4];


cli(ruta, options, statsValidado)
  .then((respuesta) => console.log(respuesta))
  .catch((error) => console.log(error));


// const input = '/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md';
// const options = '--stats';
// const options2 = '--validate';

// cli(input, options, options2);
