import { User } from "./auth";
import { Rol } from "./rols";

export type Employee = {
  id: number;
  names: string;
  last_name: string;
  dni: string;
  email: string;
  phone: string;
  address: string;
  salary?: number;
  profile_picture_url?: FileList | null;
  hire_date?: Date;
  status: string;
  role: Rol;
  user: User;
}
export type EmployeeList = {
  id: number;
  names: string;
  last_name: string;
  salary: number;
  hire_date: Date;
  profile_picture_url?: string;
  role: Rol;
  status: string;
}
export type EmployeeFormData = {
  dni: string;
  user: number;
  phone: string;
  email: string;
  address: string;
  names: string;
  last_name: string;
  salary: number;
  profile_picture_url: FileList | null;
  hire_date: Date;
  status: string;
  role_name: string;
  username: string;
  password: string;
}


export type PaginationResponse = {
  currentPage: number;
  limit: number;
  totalEmployees: number;
}

export type EmployeeResponse = {
  pagination: PaginationResponse
  result: EmployeeList[];
}

