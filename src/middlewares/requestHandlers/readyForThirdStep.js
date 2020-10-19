const { pgInsert, client } = require('../../services/pg');
const handleError = require('./handleError');

async function readyForThirdStep(req, res) {
  try {
    const user_id = req.cookies.user_id;

    const { rows } = await client.query(` 
      SELECT * FROM contacts 
      WHERE user_id = ${user_id} 
        AND step = 2
    `);

    res.send(rows);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = readyForThirdStep;
