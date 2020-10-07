const { client } = require('../../services/pg');
const handleError = require('./handleError');

async function logIn(req, res) {
  try {
    const { email, email_pass_hash } = req.body;

    const { rows } = await client.query(`
      SELECT * FROM users WHERE email = '${email}'
    `);

    if (rows.length === 0) throw new Error(`Пользователь с 'email: '${email}' не найден`);
    if (rows[0].email_pass_hash !== email_pass_hash) throw new Error(`'email_pass_hash' не совпал`);
    if (!rows[0].id) throw new Error('Ошибка сервера: user_id == false')

    res.cookie('user_id', rows[0].id);
    res.send(rows[0]);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = logIn;
