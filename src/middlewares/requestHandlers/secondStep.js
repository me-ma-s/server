const { pgInsert, client } = require('../../services/pg');
const handleError = require('./handleError');

/**
 * \{  
 *  'id':          'SERIAL PRIMARY KEY',  
 *  'user_id':     'INT',  
 *  // 'friend_id':   'INT',  
 *  // '_contact_key': 'TEXT',  
 *  '_priv_key':    'TEXT',  
 *  'status':      'TEXT'  
 * }
 */

async function secondStep(req, res) {
  try {
    const user_id = req.cookies.user_id;

    // 1. Дополнить запись приглашающего
    const { rows: [invitorContact] } = await client.query(`
      UPDATE contacts SET 
        friend_id = ${user_id}, 
        _contact_key = ${req.body._accept_key},
        step = 2
      WHERE id = ${req.body.id}
      RETURNING *
    `);

    // 2. Создать свою запись
    const acceptorContact = {
      user_id,
      friend_id: invitorContact.user_id,
      _contact_key: req.body._own_key,
      iv: req.body.iv,
      step: 3
    };

    const { rows } = await pgInsert('contacts', acceptorContact);
    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = secondStep;
