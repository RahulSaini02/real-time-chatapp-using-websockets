--  Table creations
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Table for storing users data
CREATE TABLE IF NOT EXISTS chatapp.users(
	user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name VARCHAR(256) NOT NULL,
	email VARCHAR(320) UNIQUE NOT NULL,
	password VARCHAR(256) NOT NULL,
	profile_pic VARCHAR(1024),
	created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON chatapp.users(email);

-- Table for storing chats
CREATE TABLE IF NOT EXISTS chatapp.chats(
	chat_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	is_group BOOLEAN DEFAULT FALSE NOT NULL,
	group_name VARCHAR(256) CHECK (is_group = TRUE OR group_name IS NULL),
	created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_ids ON chatapp.chats(chat_id);

-- Table for tracking participants in chats
CREATE TABLE IF NOT EXISTS chatapp.chat_participants(
	chat_id UUID NOT NULL,
	user_id UUID NOT NULL,
	joined_at TIMESTAMPTZ DEFAULT NOW(),
	PRIMARY KEY (chat_id, user_id),
	FOREIGN KEY (chat_id) REFERENCES chatapp.chats(chat_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES chatapp.users(user_id) ON DELETE CASCADE 
);

CREATE INDEX IF NOT EXISTS idx_chat_participants_chat_id ON chatapp.chat_participants(chat_id);

-- Table for storing messages in chats
CREATE TABLE IF NOT EXISTS chatapp.chat_messages(
	message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	chat_id UUID NOT NULL,
	sender_id UUID NOT NULL,
	message_type VARCHAR(256) NOT NULL CHECK (message_type IN ('text', 'image', 'video', 'file', 'audio', 'sticker', 'other')),
	message_text VARCHAR(4096),
	media_url VARCHAR(1024),
	message_timestamp TIMESTAMPTZ DEFAULT NOW(),
	is_deleted BOOLEAN DEFAULT FALSE,
	FOREIGN KEY (chat_id) REFERENCES chatapp.chats(chat_id) ON DELETE CASCADE,
	FOREIGN KEY (sender_id) REFERENCES chatapp.users(user_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_id ON chatapp.chat_messages(chat_id);

-- Table for storing message status in chats
CREATE TABLE IF NOT EXISTS chatapp.message_status (
    status_id SERIAL PRIMARY KEY,
    message_id UUID REFERENCES chatapp.chat_messages(message_id) ON DELETE CASCADE,
    user_id UUID REFERENCES chatapp.users(user_id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('sent', 'delivered', 'read')),
    status_time TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_message_status_message_id ON chatapp.message_status(message_id);