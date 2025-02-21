import { useLocation } from 'react-router-dom';
import AddRoomDataModal from './AddRoomDataModal';

export default function AddRoomData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTable = queryParams.get('createRoom');
    const open = modalTable ? true : false;

    return <AddRoomDataModal open={open} />;
}
