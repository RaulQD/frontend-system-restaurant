import { Rol } from "./rols";
export type Data = {
  id: string;
  username: string;
  full_name: string;
  role: Rol;
}
export type LoginDataForm = {
  username: string;
  password: string;
}

export type LoginResponse = {
  id: string;
  username: string;
  full_name: string;
  role: Rol;
  token: string;
}




