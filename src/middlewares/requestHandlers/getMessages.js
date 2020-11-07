const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function getMessages(req, res) {
  try {
    const channel_id = req.query.channel_id;

    const { rows } = await client.query(`
      SELECT messages.*, u.name, u.surname, u.avatar_url 
      FROM messages INNER JOIN users u ON (u.id = messages.user_id)
      WHERE channel_id=${channel_id}
      ORDER BY date_time ASC
    `);

    res.send(rows);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = getMessages;
