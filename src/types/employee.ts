import { Rol } from "./rols";

export type Employee = {
  id: string;
  username: string;
  password: string;
  names: string;
  last_name: string;
  dni: string;
  email: string;
  phone: string;
  address: string;
  salary?: number;
  profile_picture_url?: string;
  hire_date?: Date;
  status: string;
  role_name: string;
}
export type EmployeeList = {
  id: string;
  names: string;
  last_name: string;
  salary: number;
  hire_date: Date;
  role: Rol;
  status: string;
}

export type EmployeeFormData = Pick<Employee, 'dni' | 'username' | 'password' | 'phone' | 'email' | 'address' | 'names' | 'last_name' | 'salary' | 'hire_date' | 'role_name'>
export type Picture = Pick<Employee, 'profile_picture_url'>


export type PaginationResponse = {
  currentPage: number;
  limit: number;
  totalEmployees: number;
}

export type EmployeeResponse = {
  pagination: PaginationResponse
  result: EmployeeList[];
}
