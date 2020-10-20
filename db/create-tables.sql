DROP TABLE IF EXISTS keys;
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS user_in_channel;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS channels;
-- DROP TABLE IF EXISTS attachments;

DROP TYPE IF EXISTS key_type;
CREATE TYPE key_type AS ENUM ('user_key', 'channel_key', 'sign_pub_key', 'sign_priv_key', 'pub_key', 'priv_key' );
-- TODO: Подумать, как можно оптимизировать
CREATE TABLE keys (
  id    SERIAL PRIMARY KEY,
  key   TEXT,
  iv    TEXT,
  -- user_id BIGSERIAL REFERENCES users(id),
  -- channel_id 
  type  key_type
);

CREATE TABLE channels (
  id               SERIAL  PRIMARY KEY,
  name             TEXT    NOT NULL,
  avatar_url       TEXT    DEFAULT 'https://static.wikia.nocookie.net/dogelore/images/9/97/Doge.jpg/revision/latest/top-crop/width/360/height/450?cb=2019020511305',
  description      TEXT,
  creator_id       INT     NOT NULL, --
  -- key_id           INT     REFERENCES keys(id), -- TODO: сделать отдельный ключ для каждого пользователя
  reload_interval  INT     DEFAULT 30000
);

CREATE TABLE users (
  id         	     SERIAL  PRIMARY KEY,
  email            TEXT    NOT NULL UNIQUE,
  name       	     TEXT    NOT NULL,
  surname    	     TEXT    NOT NULL,
  email_pass_hash  TEXT, -- NOT NULL,
  _user_key           TEXT, -- NOT NULL UNIQUE
  avatar_url  	   TEXT    DEFAULT 'https://i.ytimg.com/vi/tWE_2HySBhc/hqdefault.jpg'
);

CREATE TABLE user_in_channel (
  user_id         INT    NOT NULL    REFERENCES users(id)    ON DELETE CASCADE,
  channel_id      INT    NOT NULL    REFERENCES channels(id) ON DELETE CASCADE,
  channel_key     TEXT,
  -- channel_key     JSON,
  preferences     TEXT,
  user_role       TEXT,
  PRIMARY KEY (user_id, channel_id)
);

CREATE TABLE messages (
  id            SERIAL     PRIMARY KEY,
  channel_id    INT        NOT NULL      REFERENCES channels(id),
  user_id       BIGINT     NOT NULL      REFERENCES users(id),
  answer_to_id  INT        DEFAULT NULL  REFERENCES messages(id),
  date_time     TIMESTAMP  NOT NULL      DEFAULT current_timestamp,
  _text         TEXT       NOT NULL,
  iv            TEXT
);

CREATE TABLE contacts (
  id           SERIAL PRIMARY KEY,
  user_id      INT,
  friend_id    INT,
  _contact_key TEXT,
  _priv_key    TEXT,
  iv           TEXT,
  step         INT
);

-- CREATE TABLE attachments (
--     message_id       INT    NOT NULL    REFERENCES messages(id) ON DELETE CASCADE,
--     attachment_order INT    NOT NULL,
--     format           TEXT   NOT NULL,
--     -- BLOB не поддерживается постгресом, нужно подобрать другой тип
--     _file            BYTEA  NOT NULL,
--     PRIMARY KEY (message_id, attachment_order)
-- );

CREATE TABLE logs (
  id          SERIAL PRIMARY KEY,
  login       TEXT,
  created_at  TIMESTAMP,
  month       INT ,
  service     TEXT,
  query       TEXT,
  params      TEXT,
  query_time  NUMERIC,
  ip          TEXT,
  url         TEXT,
  domain      TEXT
);
