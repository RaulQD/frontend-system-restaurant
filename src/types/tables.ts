import { Rooms } from "./rooms";

export type Tables = {
  id_table: number;
  num_table: string;
  capacity_table: number;
  status: string;
  room: Rooms
}
export type TableFormData = {
  num_table: string;
  capacity_table: number;
  room_id: number;
}


export type Pagination = {
  page: number;
  limit: number;
  totalTables: number;
}

export type TablePagination = {
  pagination: Pagination;
  results: Tables[];
}