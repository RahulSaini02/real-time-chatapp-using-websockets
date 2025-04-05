export interface Message {
  message_id: number | undefined;
  chat_id: string;
  sender_id: string;
  message_type: string;
  message_text: string;
  media_url: string;
  message_timestamp: string;
  is_deleted: boolean;
  status: string;
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  profile_pic: string;
}

export interface UserChatsType extends User {
  chat_id: string;
}
