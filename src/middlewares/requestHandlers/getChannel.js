const text_SelectChannelsOfUser = require('../../helpers/text_SelectChannelsOfUser');
const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function getChannel(req, res) {
  try {
    const user_id = req.cookies.user_id;
    const channel_id = req.query.channel_id;

    const { rows } = await client.query(`
      SELECT * FROM (${text_SelectChannelsOfUser(user_id)})
      WHERE channel_id = ${channel_id}
      ORDER BY id ASC
    `);
    // const { rows } = await client.query(`
    //   SELECT channels.*, keys.key AS channel_key
    //     FROM channels LEFT OUTER JOIN keys ON (channels.key_id = keys.id)
    //     WHERE channels.id=${channel_id}
    // `);

    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = getChannel;
