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
  hire_date?: Date;
  status: string;
  role_name: string;
}

export type EmployeeFormData = Pick<Employee, 'dni' | 'username' | 'password' | 'phone' | 'email' | 'address' | 'names' | 'last_name' | 'salary' | 'hire_date' | 'role_name'>
export type EmployeeList = Pick<Employee, 'id' | 'names' | 'last_name' | 'salary' | 'hire_date' | 'role_name' | 'status'>;