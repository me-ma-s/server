function text_SelectChannelsOfUser(user_id) {
  return `
    SELECT channels.*, uic._channel_key AS _channel_key, uic.iv AS iv
    FROM channels INNER JOIN user_in_channel AS uic ON (channels.id = uic.channel_id)
    WHERE uic.user_id = ${user_id}
  `
}

module.exports = text_SelectChannelsOfUser;
