export interface userRegisterFormData {
  name: string,
  email: string,
  password: string,
}

export interface userRegisterFormDataErrors {
  name?: string,
  email?: string,
  password?: string,
}

export interface userLoginFormData {
  email: string,
  password: string,
}

export interface userLoginFormDataErrors {
  email?: string,
  password?: string,
}


export interface Message {
  id: number;
  text: string;
  sender: string;
  time: string;
  status: string;
}

export interface User {
  id: number;
  name: string;
  profile_pic: string;
  status: string;
  messages: Message[];
}
