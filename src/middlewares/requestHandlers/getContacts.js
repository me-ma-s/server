const { client } = require('../../services/pg');
const handleError = require('./handleError');


async function getContacts(req, res) {
  try {
    const user_id = req.cookies.user_id;
    
    const { rows } = await client.query(`
      SELECT * FROM contacts
      WHERE user_id = ${user_id} 
        AND step = 3
      ORDER BY id ASC
    `);

    res.send(rows);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = getContacts;
