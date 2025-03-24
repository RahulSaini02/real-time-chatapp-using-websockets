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