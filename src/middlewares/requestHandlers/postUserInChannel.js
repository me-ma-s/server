const { pgInsert } = require('../../services/pg');
const handleError = require('./handleError');

async function postUserInChannel(req, res) {
  try {
    const { rows } = await pgInsert('user_in_channel', req.body);
    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = postUserInChannel;
