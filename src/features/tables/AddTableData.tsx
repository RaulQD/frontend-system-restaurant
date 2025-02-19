import { useLocation } from 'react-router-dom';
import AddTableDataModal from './AddTableDataModal';

export default function AddTableData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTable = queryParams.get('createTable');
    const open = modalTable ? true : false;

    return <AddTableDataModal open={open} />;
}
