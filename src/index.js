const http = require('http');
const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const setupApiRoutes = require('./middlewares/api');
const setupAppRoutes = require('./middlewares/setupAppRoutes');
const logger = require('./services/logger');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.HTTP_PORT = process.env.HTTP_PORT || 30001;

function onUnhandledRejection(err) {
  console.log('APPLICATION ERROR:', err);
}

function onUnhandledException(err) {
  console.log('FATAL ERROR:', err);
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledRejection);
process.on('uncaughtException', onUnhandledException);

app.set('env', process.env.NODE_ENV);
// app.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger);

try {
  setupApiRoutes(app);
} catch (e) {
  console.log(e);
}
setupAppRoutes(app);

const srvr = http.createServer(app);
srvr.listen(process.env.HTTP_PORT, () => {
  console.log(`Server is now running on http://localhost:${process.env.HTTP_PORT}`);
});
srvr.timeout = 1800000;