function authFilter(req, res, next) {
  const url = req.url;
  const user_id = req.cookies.user_id;
  const auth = (url === '/api/logIn') || (url === '/api/postUser');
  console.log({ url });
  console.log({ user_id });
  console.log({ auth });

  if (!user_id && !auth) {
    console.log('Запрос не авторизированного пользователя отклонен');
    res.send({error: 'Пройдите аутентификацию'});
  } else {
    next();
  }
}

module.exports = authFilter;
