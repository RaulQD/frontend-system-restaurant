import { Rooms } from "./rooms";

export type Tables = {
  id_table: number;
  num_table: string;
  capacity_table: number;
  status: string;
  room: Rooms
}

export type ManageTable = {
  id_table: number;
  num_table: string;
  capacity_table: number;
  status: string;
  room: Rooms
  employee_id?: number;
  employee_name?: string;
  employee_last_name?: string;
  total_amount?: number;
}

export type TableFormData = {
  num_table: string;
  capacity_table: number;
  room_id: number;
}
export type TableList = Pick<Tables, 'id_table' | 'num_table' | 'capacity_table' | 'status' | 'room'>;


export type Pagination = {
  page: number;
  limit: number;
  totalTables: number;
}

export type TablePagination = {
  pagination: Pagination;
  results: TableList[];
}