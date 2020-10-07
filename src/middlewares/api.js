const getChannelsOfUser = require("./requestHandlers/getChannelsOfUser");
const getUsersOfChannel = require("./requestHandlers/getUsersOfChannel");
const postUserInChannel = require("./requestHandlers/postUserInChannel");
const getAllChannels = require("./requestHandlers/getAllChannels");
const getUser = require("./requestHandlers/getUser");
const postUser = require("./requestHandlers/postUser");
const getMessages = require("./requestHandlers/getMessages");
const postMessage = require("./requestHandlers/postMessage");
const getChannel = require("./requestHandlers/getChannel");
const postChannel = require("./requestHandlers/postChannel");
const getAllUsers = require("./requestHandlers/getAllUsers");
const getKey = require("./requestHandlers/getKey");
const postKey = require("./requestHandlers/postKey");
const logIn = require("./requestHandlers/logIn");
const logOut = require("./requestHandlers/logOut");

module.exports = function setupApiRoutes(app) {
  //channels
  app.post('/api/postChannel', postChannel);
  app.get('/api/getAllChannels', getAllChannels);
  app.get('/api/getChannel', getChannel);

  //messages
  app.post('/api/postMessage', postMessage);
  app.get('/api/getMessages', getMessages);
  // app.get('/api/channels/:channelId/messages', getMessages);

  //users
  app.post('/api/postUser', postUser);
  app.get('/api/getAllUsers', getAllUsers);
  app.get('/api/getUser', getUser);

  //authorization
  app.post('/api/logIn', logIn);
  // TODO: после отладки сделать .post
  app.get('/api/logOut', logOut);

  //user_in_channel
  app.post('/api/postUserInChannel', postUserInChannel);
  // app.post('/api/channels/:channelId/users/:userId', postUserInChannel);
  app.get('/api/getUsersOfChannel', getUsersOfChannel);
  app.get('/api/getChannelsOfUser', getChannelsOfUser);

  // keys
  app.get('/api/getKey', getKey);
  app.post('/api/postKey', postKey);
};
