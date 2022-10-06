export interface User {
  id: string;
  username: string;
  givenName: string;
  lastName: string;
  surname: string;
  telephone: string;
  complete: boolean;
}

export interface UserRegister {
  username: string;
  password: string;
  password2: string;
}

export interface UserRequest {
  id: string;
  username: string;
  password: string;
}
