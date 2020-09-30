const handleError = require('./handleError');

async function logOut(req, res) {
  try {
    res.clearCookie(user_id);
    res.sendStatus(200);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = logOut;
