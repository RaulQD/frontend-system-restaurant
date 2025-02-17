
export type Tables = {
  id_table: number;
  num_table: number;
  capacity_table: number;
  status: string;
}

export type TableFormData = Pick<Tables, 'num_table' | 'capacity_table'>;
export type Pagination = {
  page: number;
  limit: number;
  totalTables: number;
}

export type TablePagination = {
  pagination: Pagination;
  results: Tables[];
}