const text_SelectChannelsOfUser = require('../../helpers/text_SelectChannelsOfUser');
const { client } = require('../../services/pg');
const handleError = require('./handleError');


async function getAllChannels(req, res) {
  try {
    const user_id = req.cookies.user_id;
    
    const { rows } = await client.query(`
      ${text_SelectChannelsOfUser(user_id)}
      ORDER BY id ASC
    `);

    res.send(rows);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = getAllChannels;
