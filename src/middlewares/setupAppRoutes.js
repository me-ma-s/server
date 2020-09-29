const { resolve } = require('path');
const express = require('express');

const staticPath = resolve(__dirname, '..', '..', '..', 'static');
console.log({staticPath});

module.exports = function setupAppRoutes(app) {
  app.use('/static', express.static(staticPath));
};
