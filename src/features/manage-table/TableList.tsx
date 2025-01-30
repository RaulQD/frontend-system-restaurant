import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTables } from './useTables';
import { useEffect, useState } from 'react';
import CardTable from './CardTable';
import Spinner from '@/components/Spinner';
import { Tables } from '@/types/tables';
import { useGetOrderActiveForTable } from '../order/useGetOrderActiveForTable';

export default function TableList() {
    const [selectedTable, setSelectedTable] = useState<Tables['id_table']>();
    const { activeOrder, isLoading: isOrderLoading } =
        useGetOrderActiveForTable(selectedTable || 0);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const room = searchParams.get('room') || 'comedor principal';
    const { tables, isLoading, error } = useTables(room);

    useEffect(() => {
        if (!searchParams.has('room')) {
            searchParams.set('room', 'comedor principal');
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams]);

    const handleTableClick = (
        tableId: Tables['id_table'],
        tableStatus: Tables['status']
    ) => {
        if (tableStatus === 'OCUPADO') {
            setSelectedTable(tableId);
        } else {
            navigate(`/dashboard/tables/${tableId}/order/`);
        }
    };
    useEffect(() => {
        if (activeOrder && selectedTable) {
            navigate(
                `/dashboard/tables/${selectedTable}/order/${activeOrder?.id_order}`
            );
        }
    }, [activeOrder, selectedTable, navigate]);
    if (!tables?.length) {
        return (
            <div className='flex justify-center items-center pt-20'>
                <p className='text-lg'>{error?.message}</p>
            </div>
        );
    }
    if (isLoading || isOrderLoading) {
        return (
            <div className='flex justify-center items-center pt-40'>
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 gap-y-5'>
                {tables?.map((table) => (
                    <li
                        className='cursor-pointer'
                        key={table.id_table}
                        onClick={() =>
                            handleTableClick(table.id_table, table.status)
                        }>
                        <CardTable table={table} />
                    </li>
                ))}
            </ul>
        </>
    );
}
