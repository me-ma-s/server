const { resolve } = require('path');
const express = require('express');

const staticPath = resolve(__dirname, '..', '..', '..', 'static');

module.exports = function setupAppRoutes(app) {
  app.use('/static', express.static(staticPath));
};
