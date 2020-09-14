const { resolve } = require('path');
const express = require('express');
const compression = require('compression');

const clientBuildPath = resolve(__dirname, '..', '..', 'client');
const staticPath = resolve(__dirname, '..', '..', '..', 'static');
console.log({clientBuildPath});
console.log({staticPath});

module.exports = function setup(app) {
  app.use(compression());
  app.use('/', express.static(clientBuildPath));
  app.use('/static', express.static(staticPath));

  app.get('*', (req, res) => res.sendFile(resolve(clientBuildPath, 'index.html')));
};
