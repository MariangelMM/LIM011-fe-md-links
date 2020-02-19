const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});

fetchMock
  .mock('https://developers.google.com/v8/', 200)
  .mock('https://nodejs.org/', 200)
  .mock('https://es.wikipedia.org/wiki/Markdown/', 200)
  .mock('https://nodejs.org/esesd/', 404)
  .mock('*', 200);

module.exports = fetchMock;
