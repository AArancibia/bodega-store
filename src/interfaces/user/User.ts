export interface User {
  id: string;
  username: string;
  givenName: string;
  lastName: string;
  surname: string;
  telephone: string;
  complete: boolean;
  profiles: Array<Profile>;
  email: string;
}

export interface Profile {
  id: string;
  description: string;
  icon: any;
  url: string;
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
