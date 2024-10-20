import { Rol } from "./rols";
export type Data = {
  id: string;
  username: string;
  full_name: string;
  profile_picture_url: string;
  role: Rol;
  token: string;
}
export type LoginResponse = Pick<Data, 'id' | 'username' | 'full_name' | 'role' | 'token'>
export type EmployeeProfile = Pick<Data, 'id' | 'username' | 'full_name' | 'profile_picture_url' | 'role'>


export type LoginDataForm = {
  username: string;
  password: string;
}






