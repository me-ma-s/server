const { pgInsert } = require('../../services/pg');
const handleError = require('./handleError');

/**
 * \{  
 *  'id':          'SERIAL PRIMARY KEY',  
 *  'user_id':     'INT',  
 *  // 'friend_id':   'INT',  
 *  // 'contact_key': 'TEXT',  
 *  'priv_key':    'TEXT',  
 *  'status':      'TEXT'  
 * }
 */

async function postContact(req, res) {
  try {
    const user_id = req.cookies.user_id;
    const contact = { ...req.body, step: 1, user_id };
    const { rows } = await pgInsert('contacts', contact);
    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = postContact;
