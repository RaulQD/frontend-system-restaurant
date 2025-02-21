import { getTableById } from '@/services/apiTables';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import EditTabledataModal from './EditTabledataModal';
import { Tables } from '@/types/tables';

export default function EditTableData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tableId = queryParams.get('editTable');
    const open = tableId ? true : false;
    const { data } = useQuery<Tables>({
        queryKey: ['tables', tableId],
        queryFn: () => getTableById(Number(tableId)),
        enabled: !!tableId,
    });

    if (data) return <EditTabledataModal open={open} data={data} tableId={Number(tableId)}/>;
}
