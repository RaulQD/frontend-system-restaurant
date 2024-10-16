import { Rol } from "./rols";

export type LoginDataForm = {
  username: string;
  password: string;
}

export type LoginResponse = {
  data: Data;
  token: string;
}

export type Data = {
  id: string;
  username: string;
  full_name: string;
  role: Rol;
}


