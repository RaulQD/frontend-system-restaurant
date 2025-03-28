import { Rol } from "./rols";

export type User = {
  id: number;
  username: string;
  password: string;
  status: string;
  role: Rol;
}

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
export type EmployeeProfile = {
  id: number;
  username: string;
  employee: Employee;
  role: string;
}

export type LoginResponse = Pick<Data, 'id' | 'username' | 'employee' | 'role' | 'token'>


export type LoginDataForm = {
  username: string;
  password: string;
}





