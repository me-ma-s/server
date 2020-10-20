const { pgInsert } = require('../../services/pg');
const handleError = require('./handleError');

async function postChannel(req, res) {
  try {
    const channel = req.body;
    // 1. Выделить пользовательский ключ канала
    const user_channel_key = channel._channel_key;
    delete channel.channel_key
    // 2. Создать канал, записать его создателя
    channel.creator_id = req.cookies.user_id;
    const { rows: [pgChannel] } = await pgInsert('channels', channel);
    // 3. Запостить ключ в табилцу ключей, получить его id
    // TODO: нормально запостить ключ
    // TODO: удалить этот пункт совсем
    // const { rows: [pgKey] } = await pgInsert('keys', user_channel_key);
    // 4. Создать соответствие между пользователем и каналом, указать там id ключа
    const { rows: [pgUIC] } = await pgInsert('user_in_channel', {
      user_id: req.cookies.user_id,
      channel_id: pgChannel.id,
      _channel_key: user_channel_key
    });
    // 5. Вернуть пользователю объект
    pgChannel.channel_key = user_channel_key;
    res.send(pgChannel);

  } catch (err) {
    handleError(err, res);
  }
}

module.exports = postChannel;
