const { pgInsert } = require('../../services/pg');
const handleError = require('./handleError');


async function thirdStep(req, res) {
  try {
    const user_id = req.cookies.user_id;

    const { rows } = await client.query(`
    UPDATE contacts SET 
      friend_id = ${user_id}, 
      _contact_key = ${req.body._contact_key},
      step = 3
    WHERE id = ${req.body.id}
    RETURNING *
  `);
  res.send(rows[0]);


  } catch (err) {
    handleError(err, res);
  }
}

module.exports = thirdStep;
