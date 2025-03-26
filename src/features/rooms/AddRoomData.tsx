import { useLocation } from 'react-router-dom';
import AddRoomDataModal from './AddRoomDataModal';

export default function AddRoomData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalRoom = queryParams.get('createRoom');
    const open = modalRoom ? true : false;

    return <AddRoomDataModal open={open} />;
}
