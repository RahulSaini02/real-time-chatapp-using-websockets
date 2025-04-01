# Chat Application Database Schema

## Extensions

- **pgcrypto**: Enables UUID generation using `gen_random_uuid()`.

## Tables

### 1. Users (`chatapp.users`)

Stores user information.

| Column       | Type         | Constraints                                      |
|-------------|-------------|--------------------------------------------------|
| `user_id`   | UUID        | Primary Key, Default: `gen_random_uuid()`       |
| `name`      | VARCHAR(256)| NOT NULL                                        |
| `email`     | VARCHAR(320)| UNIQUE, NOT NULL                                |
| `password`  | VARCHAR(256)| NOT NULL                                        |
| `profile_pic` | VARCHAR(1024) | Optional                                  |
| `created_at` | TIMESTAMPTZ | Default: `NOW()`                               |

**Indexes:**

- `idx_users_email` on `email`

---

### 2. Chats (`chatapp.chats`)

Stores chat-related information.

| Column       | Type         | Constraints                                      |
|-------------|-------------|--------------------------------------------------|
| `chat_id`   | UUID        | Primary Key, Default: `gen_random_uuid()`       |
| `is_group`  | BOOLEAN     | Default: `FALSE`, NOT NULL                      |
| `group_name` | VARCHAR(256) | Required if `is_group = TRUE`, else `NULL`    |
| `created_at` | TIMESTAMPTZ | Default: `NOW()`                               |

**Indexes:**

- `idx_chat_ids` on `chat_id`

---

### 3. Chat Participants (`chatapp.chat_participants`)

Tracks users participating in a chat.

| Column     | Type | Constraints |
|------------|------|------------|
| `chat_id`  | UUID | Foreign Key → `chatapp.chats(chat_id)`, ON DELETE CASCADE |
| `user_id`  | UUID | Foreign Key → `chatapp.users(user_id)`, ON DELETE CASCADE |
| `joined_at` | TIMESTAMPTZ | Default: `NOW()` |

**Primary Key:** (`chat_id`, `user_id`)  
**Indexes:**

- `idx_chat_participants_chat_id` on `chat_id`

---

### 4. Chat Messages (`chatapp.chat_messages`)

Stores messages sent within a chat.

| Column            | Type         | Constraints                                      |
|-------------------|-------------|--------------------------------------------------|
| `message_id`      | UUID        | Primary Key, Default: `gen_random_uuid()`       |
| `chat_id`        | UUID        | Foreign Key → `chatapp.chats(chat_id)`, ON DELETE CASCADE |
| `sender_id`      | UUID        | Foreign Key → `chatapp.users(user_id)`, ON DELETE CASCADE |
| `message_type`   | VARCHAR(256)| CHECK (`text`, `image`, `video`, `file`, `audio`, `sticker`, `other`) |
| `message_text`   | VARCHAR(4096) | Optional                                  |
| `media_url`      | VARCHAR(1024) | Optional                                  |
| `message_timestamp` | TIMESTAMPTZ | Default: `NOW()`                       |
| `is_deleted`     | BOOLEAN     | Default: `FALSE`                                 |

**Indexes:**

- `idx_chat_messages_chat_id` on `chat_id`

---

### 5. Message Status (`chatapp.message_status`)

Tracks the status of messages for each user.

| Column       | Type         | Constraints                                      |
|-------------|-------------|--------------------------------------------------|
| `status_id` | SERIAL      | Primary Key                                      |
| `message_id` | UUID       | Foreign Key → `chatapp.chat_messages(message_id)`, ON DELETE CASCADE |
| `user_id`   | UUID        | Foreign Key → `chatapp.users(user_id)`, ON DELETE CASCADE |
| `status`    | VARCHAR(20) | CHECK (`sent`, `delivered`, `read`)              |
| `status_time` | TIMESTAMP  | Default: `NOW()`                                |

**Indexes:**

- `idx_message_status_message_id` on `message_id`
