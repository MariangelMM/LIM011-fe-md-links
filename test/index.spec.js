const fetchMock = require('fetch-mock');
const funciones = require('../src/index');
const validar = require('../src/validar');
const mdlinks = require('../src/md-links');
const estatus = require('../src/estatus');
const funcionCli = require('../src/md-linksCli');

fetchMock.mock('*', 200);

const ruta = '/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md';

const linkvalidados = [
  {
    status: 404,
    message: 'fail',
    href: 'https://nodejs.org/esesd/',
    text: 'Node.js',
    file:
 '/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md',
  },
  {
    status: 200,
    message: 'ok',
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file:
 '/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md',
  },
];

const links = [
  {
    href: 'https://nodejs.org/esesd/',
    text: 'Node.js',
    file:
 '/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md',
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file:
 '/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md',
  },
];


describe('Leyendo la ruta', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.exisRutaAbsoluta).toBe('function');
  });
  it('Deberia retornar false si la ruta no existe', () => {
    expect(funciones.exisRutaAbsoluta('.')).toBe(false);
  });
  it('Deberia retornar true si la ruta es absoluta', () => {
    expect(funciones.exisRutaAbsoluta('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/mardown.md')).toBe(true);
  });
  it('Deberia retornar false si la ruta no es absoluta', () => {
    expect(funciones.exisRutaAbsoluta('package.json')).toBe(false);
  });
});

describe('Convertir ruta', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.converRutaAbsoluta).toBe('function');
  });
  it('Deberia convertir una ruta relativa a ruta absoluta', () => {
    expect(funciones.converRutaAbsoluta('mardown.md')).toBe('/home/laboratoria/Escritorio/LIM011-fe-md-links/mardown.md');
  });
});

describe('Verificar si la ruta es un archivo', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.verificaArchivo).toBe('function');
  });
  it('Deberia retornar true si la ruta es un archivo', () => {
    expect(funciones.verificaArchivo('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/mardown.md')).toBe(true);
  });
  it('Deberia retornar false si la ruta es un directorio', () => {
    expect(funciones.verificaArchivo('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/')).toBe(false);
  });
});

describe('Verificar si la ruta es una carpeta', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.verificaCarpeta).toBe('function');
  });
  it('Deberia retornar false si la ruta es un archivo', () => {
    expect(funciones.verificaCarpeta('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/mardown.md')).toBe(false);
  });
  it('Deberia retornar true si la ruta es un directorio', () => {
    expect(funciones.verificaCarpeta('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme')).toBe(true);
  });
});

describe('Verificar si es un archivo mardown', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.esUnArchivoMD).toBe('function');
  });
  it('Deberia retornar true si la ruta es un archivo MD', () => {
    expect(funciones.esUnArchivoMD('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/mardown.md')).toBe(true);
  });
  it('Deberia retornar false si la ruta no es un archivo MD', () => {
    expect(funciones.esUnArchivoMD('/home/laboratoria/Escritorio/LIM011-fe-md-links/package.json')).toBe(false);
  });
});


describe('Verificar si dentro de la carpeta hay un archivos', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.revisaDirectorio).toBe('function');
  });
  it('Deberia retornar un arreglo con los archivos', () => {
    expect(funciones.revisaDirectorio('/home/laboratoria/Escritorio/LIM011-fe-md-links/')).toEqual(['.eslintrc.json',
      '.git',
      '.gitignore',
      '.vscode',
      'README.md',
      'coverage',
      'jest.config.js',
      'node_modules',
      'package-lock.json',
      'package.json',
      'src',
      'test',
      'test-readme']);
  });
});

describe('Verifica si en la ruta hay archivos mardown', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.buscaArchivoMD).toBe('function');
  });
  it('Deberia retornar true las rutas de los archivos mardown', () => {
    expect(funciones.buscaArchivoMD('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme')).toStrictEqual(['/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/mardown.md', '/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md']);
  });
});

describe('Leer informacion del archivo', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.leeArchivos).toBe('function');
  });
  it('Deberia retornar la informacion del archivo', () => {
    expect(funciones.leeArchivos(ruta)).toStrictEqual('# Node \n[Node.js](https://nodejs.org/esesd/) es un entorno de ejecución para JavaScript\nconstruido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).\nEsto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,\nya sea tu máquina o un servidor, lo cual nos abre las puertas para poder\ninteractuar con el sistema en sí, archivos, redes, ...');
  });
});

describe('Extrae informacion de archivo', () => {
  it('Deberia ser una función', () => {
    expect(typeof funciones.leyendoInfoArchivos).toBe('function');
  });
  it('Deberia retornar los links dentro de un archivo MD', () => {
    expect(funciones.leyendoInfoArchivos('/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md'))
      .toStrictEqual([
        {
          href: 'https://nodejs.org/esesd/',
          text: 'Node.js',
          file: '/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md',
        },
        {
          href: 'https://developers.google.com/v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: '/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md',
        },
      ]);
  });
});

describe('Valida los links del archivo', () => {
  it('Deberia ser una función', () => {
    expect(typeof validar.validaLinks).toBe('function');
  });
  it('Deberia retornar un array con los links validados', (done) => {
    validar.validaLinks(ruta).then((data) => {
      expect(data).toStrictEqual(linkvalidados);
      done();
    });
  });
});

describe('Recibe la opcion para validar o no los links', () => {
  it('Deberia ser una función', () => {
    expect(typeof mdlinks.mdLinks).toBe('function');
  });
  it('Si la opcion es true devuelve los links validados', (done) => {
    mdlinks.mdLinks(ruta, true).then((data) => {
      expect(data).toStrictEqual(linkvalidados);
      done();
    });
  });
  it('Si la opcion es false devuelve los links', (done) => {
    mdlinks.mdLinks(ruta, false).then((data) => {
      expect(data).toStrictEqual(links);
      done();
    });
  });
});

describe('Deberia contar los links dentro de un archivo mardown ', () => {
  it('Deberia ser una función', () => {
    expect(typeof estatus.stats).toBe('function');
  });
  it('Si la opcion es stast deberia retornar un objeto con la cantidad de links', () => {
    expect(estatus.stats(linkvalidados)).toStrictEqual({
      Total: 2,
      Unique: 2,
    });
  });
});

describe('Deberia contar los links dentro de un archivo mardown ', () => {
  it('Deberia ser una función', () => {
    expect(typeof estatus.statsValidado).toBe('function');
  });
  it('Si la opcion validate devuelve un objeto con los links contados y validados', () => {
    expect(estatus.statsValidado(linkvalidados)).toStrictEqual({
      Total: 2,
      Unique: 2,
      Broken: 1,
    });
  });
});


describe('Deberia mostrar informacion segun la opcion marcada ', () => {
  it('Deberia ser una función', () => {
    expect(typeof funcionCli).toBe('function');
  });
  it('Es una función que retorna las estadísticas y validación de los links', (done) => {
    const option = '--stats';
    const option2 = '--validate';
    const stasVali = 'Total: 2\nUnique: 2\nBroken: 1';
    funcionCli(ruta, option, option2).then((res) => {
      expect(res).toEqual(stasVali);
      done();
    });
  });
  it('Es una función que retorna las estadísticas y validación de los links', (done) => {
    const options = '--stats';
    const stas = 'Total: 2\nUnique: 2';
    funcionCli(ruta, options).then((res) => {
      expect(res).toEqual(stas);
      done();
    });
  });
  it('Es una función que retorna las estadísticas y validación de los links', (done) => {
    const options = '--validate';
    const valida = 'File:/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md Href:https://nodejs.org/esesd/ Mensaje:fail Estatus:404 Texto:Node.js\nFile:/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md Href:https://developers.google.com/v8/ Mensaje:ok Estatus:200 Texto:motor de JavaScript V8 de Chrome\n';
    return funcionCli(ruta, options).then((res) => {
      expect(res).toEqual(valida);
      done();
    });
  });
  it('Es una función que retorna las estadísticas y validación de los links', (done) => {
    const valida = 'File:/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md Href:https://nodejs.org/esesd/ Texto:Node.js \nFile:/home/laboratoria/Escritorio/LIM011-fe-md-links/test-readme/node.md Href:https://developers.google.com/v8/ Texto:motor de JavaScript V8 de Chrome \n';
    return funcionCli(ruta).then((res) => {
      expect(res).toEqual(valida);
      done();
    });
  });
  it('Es una función que retorna las estadísticas y validación de los links', (done) => {
    funcionCli('ruta').then((res) => {
      expect(res).toBe('Ingrese una ruta valida');
      done();
    });
  });
});
