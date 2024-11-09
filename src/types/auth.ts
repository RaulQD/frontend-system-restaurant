import { Rol } from "./rols";

export type Employee = {
  id_employee: number;
  full_name: string;
  profile_picture_url?: string;

}


export type Data = {
  id: number;
  username: string;
  employee: Employee;
  role: Rol;
  token: string;
}
export type LoginResponse = Pick<Data, 'id' | 'username' | 'employee' | 'role' | 'token'>
export type EmployeeProfile = Pick<Data, 'id' | 'username' | 'employee' | 'role'>


export type LoginDataForm = {
  username: string;
  password: string;
}





