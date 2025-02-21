import { getRoomById } from '@/services/apiRooms';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import EditRoomDataModal from './EditRoomDataModal';
import { Rooms } from '@/types/rooms';

export default function EditRoomData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const roomId = queryParams.get('editRoom');
    const open = roomId ? true : false;

    const { data } = useQuery<Rooms>({
        queryKey: ['roomsDetails', roomId],
        queryFn: () => getRoomById(Number(roomId)),
        enabled: !!roomId,
    });
    console.log(data);

    if(data) return <EditRoomDataModal open={open} data={data} roomId={Number(roomId)} />;
}
