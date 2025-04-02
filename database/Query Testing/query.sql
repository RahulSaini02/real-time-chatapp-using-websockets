SELECT
	*
FROM
	chatapp.users;

-- 984c4ac2-504d-4f68-bfae-ca0c35f221ad, 6f23d210-9312-4639-a085-a17e47c3b2ab
SELECT
	*
FROM
	chatapp.chats;

SELECT
	*
FROM
	chatapp.chat_participants;

-- Query to check if there is already a chat between user 1 and user 2
SELECT
	chat_id,
	user1,
	u.name AS user1_name,
	user2,
	u.name AS user2_name (
		SELECT
			a.chat_id AS chat_id,
			a.user_id AS user1,
			b.user_id AS user2
		FROM
			(
				SELECT
					DISTINCT chat_id,
					user_id
				FROM
					chatapp.chat_participants
				WHERE
					user_id = '6f23d210-9312-4639-a085-a17e47c3b2ab'
			) a
			INNER JOIN (
				SELECT
					DISTINCT chat_id,
					user_id
				FROM
					chatapp.chat_participants
				WHERE
					user_id = 'c5adc5b5-feac-48c9-9df5-2fa6afe6fb82'
			) b ON a.chat_id = b.chat_id
	) c
	JOIN chatapp.users u ON u.user_id = c.user1
	OR u.user_id = c.user2;

-- Query TO get DISTINCT chats of the logged IN user.
SELECT
	DISTINCT 
	u.user_id,
	u.name,
	u.email,
	u.profile_pic,
	cp.chat_id
FROM
	chatapp.chat_participants cp
	INNER JOIN chatapp.users u ON u.user_id = cp.user_id
WHERE
	cp.chat_id IN(
		SELECT
			DISTINCT cp.chat_id
		FROM
			chatapp.users u
			INNER JOIN chatapp.chat_participants cp ON u.user_id = cp.user_id
			AND u.user_id = 'c5adc5b5-feac-48c9-9df5-2fa6afe6fb82'
	)
	AND cp.user_id != 'c5adc5b5-feac-48c9-9df5-2fa6afe6fb82';

-- 20c1f9d1-6da4-4af3-9483-d04bef6bb4d1 monica
-- 6f23d210-9312-4639-a085-a17e47c3b2ab roy
-- c5adc5b5-feac-48c9-9df5-2fa6afe6fb82 sam