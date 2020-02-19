const stats = (data) => {
  const arrLinks = [];
  const totalLinks = data.length;
  data.forEach((element) => {
    arrLinks.push(element.href);
  });
  const unicos = new Set(arrLinks);
  const obj = {
    Total: totalLinks,
    Unique: unicos.size,
  };
  return obj;
};


const statsValidado = (data) => {
  const arrLinks = [];
  const totalLinks = data.length;
  const brokenLinks = data.filter((elemento) => elemento.message === 'fail').length;
  data.forEach((elemento) => {
    arrLinks.push(elemento.href);
  });
  const unicos = new Set(arrLinks);
  const obj = {
    Total: totalLinks,
    Unique: unicos.size,
    Broken: brokenLinks,
  };
  return obj;
};

const status = {
  stats,
  statsValidado,
};

module.exports = status;
