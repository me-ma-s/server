const { pgInsert } = require('../../services/pg');
const handleError = require('./handleError');

async function postMessage(req, res) {
  try {
    const user_id = req.cookies.user_id;
    const msg = {...req.body, user_id}
    const { rows } = await pgInsert('messages', msg);
    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = postMessage;
