const fetchMock = require('fetch-mock').sandbox();

fetchMock
  .mock('https://developers.google.com/v8/', 200)
  .mock('https://nodejs.org/', 200)
  .mock('https://es.wikipedia.org/wiki/Markdown/', 200)
  .mock('https://nodejs.org/esesd/', 404)
  .mock('*', 200);

module.exports = fetchMock;
