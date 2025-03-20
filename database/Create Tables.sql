CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE chatapp.users(
	userid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name VARCHAR(256) NOT NULL,
	email VARCHAR(320) UNIQUE NOT NULL,
	PASSWORD VARCHAR(256) NOT NULL,
	profile_pic VARCHAR(1024),
	created_at timestamptz DEFAULT NOW()
);

CREATE INDEX idx_users_email ON chatapp.users(email);