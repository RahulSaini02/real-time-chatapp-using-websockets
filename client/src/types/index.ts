export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  status: string;
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  profile_pic: string;
}

export interface UserChatsType extends User {
  chat_id: string;
}
