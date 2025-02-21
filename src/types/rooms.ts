
export type Rooms = {
  id: number;
  room_name: string;
  num_tables: string;
}
export type RoomFormData = Pick<Rooms, 'room_name' | 'num_tables'>;