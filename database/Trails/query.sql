select * from chatapp.users; -- 984c4ac2-504d-4f68-bfae-ca0c35f221ad, 6f23d210-9312-4639-a085-a17e47c3b2ab
select * from chatapp.chats;
select * from chatapp.chat_participants;

DELETE from chatapp.chats;

INSERT INTO chatapp.chats(IS_GROUP) VALUES('FALSE'); --b394c8bb-d340-46ea-8e7f-16a00278a963

INSERT INTO chatapp.chat_participants(chat_id, user_id) VALUES 
('b394c8bb-d340-46ea-8e7f-16a00278a963', '984c4ac2-504d-4f68-bfae-ca0c35f221ad'),
('b394c8bb-d340-46ea-8e7f-16a00278a963', '6f23d210-9312-4639-a085-a17e47c3b2ab');


DELETE FROM chatapp.chat_participants where chat_id = 'b394c8bb-d340-46ea-8e7f-16a00278a963';

SELECT chat_id
FROM chatapp.chats
WHERE chat_id IN(
SELECT 
	DISTINCT chat_id, user_id
FROM 
	chatapp.chat_participants
WHERE
	user_id IN ('6f23d210-9312-4639-a085-a17e47c3b2ab', 'c5adc5b5-feac-48c9-9df5-2fa6afe6fb82')
) AND is_group = 'false';


SELECT 
	c.chat_id,
	cp.name
FROM 
	chatapp.chats c
INNER JOIN
(
SELECT 
	u.name,
	c.chat_id
FROM
	chatapp.users u
INNER JOIN
	chatapp.chat_participants c
ON u.user_id = c.user_id
) cp
ON c.chat_id = cp.chat_id;

SELECT 
	u.name,
	c.chat_id
FROM
	chatapp.users u
INNER JOIN
	chatapp.chat_participants c
ON u.user_id = c.user_id
ORDER BY name;


selct 
(SELECT 
	DISTINCT 
	c.chat_id, 
	u1.name as user1, 
	u2.name as user2 
FROM chatapp.chat_participants c 
JOIN chatapp.users u1 ON u1.user_id = c.user_id
JOIN chatapp.users u2 ON u2.user_id = c.user_id and u1.user_id = u2.user_id);

SELECT DISTINCT
	c.chat_id,
	u1.name as user1
	-- u2.name as user2
FROM
	chatapp.chat_participants c
INNER JOIN
	chatapp.users u1
ON u1.user_id = c.user_id
OUTER JOIN
	chatapp.users u2
ON u2.user_id = c.user_id
ORDER BY chat_id;

select chat_id, user1, u.name as user1_name,  user2, u.name as user2_name
(
select a.chat_id as chat_id, a.user_id as user1, b.user_id as user2
from (
select distinct 
chat_id, user_id
from chatapp.chat_participants
where user_id = '6f23d210-9312-4639-a085-a17e47c3b2ab'
) a
inner join 
(select distinct 
chat_id, user_id
from chatapp.chat_participants
where user_id = 'c5adc5b5-feac-48c9-9df5-2fa6afe6fb82')
b ON a.chat_id = b.chat_id
) c
join chatapp.users u on u.user_id = c.user1 or u.user_id = c.user2;
	