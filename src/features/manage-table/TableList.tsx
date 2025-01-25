import FilterButton from '@/components/FilterButton';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTables } from './useTables';
import { useEffect, useState } from 'react';
import { Rooms } from '@/types/rooms';
import { getRooms } from '@/services/apiRooms';
import CardTable from './CardTable';
import Spinner from '@/components/Spinner';
import { Tables } from '@/types/tables';
import { Order } from '@/types/order';
import { useGetOrderActiveForTable } from '../order/useGetOrderActiveForTable';
import AlertMessageDialog from '@/components/AlertMessageDialog';

export default function TableList() {
    const [isOpen, setIsOpen] = useState(false);

    const params = useParams();
    const tableId = params.tableId;
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { activeOrder } = useGetOrderActiveForTable(Number(tableId));

    const room = searchParams.get('room') || 'comedor principal';
    const { tables, isLoading, error } = useTables(room);

    useEffect(() => {
        if (!searchParams.has('room')) {
            searchParams.set('room', 'comedor principal');
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams]);
    const handleRedirectToCreateOrder = (
        tableId: Tables['id_table'],
        tableStatus: Tables['status']
    ) => {
        if (tableStatus === 'OCUPADO') {
            setIsOpen(true);
        } else {
            navigate(`/dashboard/tables/${tableId}/order/`);
        }
    };
    const handleRedirectToUpdateOrder = (
        tableId: Tables['id_table'],
        orderId: Order['id_order']
    ) => {
        navigate(`/dashboard/tables/${tableId}/order/${orderId}`);
    };
    if (!tables) {
        <div className='flex justify-center items-center pt-20'>
            <p className='text-lg'>{error?.message}</p>
        </div>;
    }
    if (isLoading) {
        <div className='flex justify-center items-center pt-40'>
            <Spinner />
        </div>;
    }

    return (
        <>
            
            <div className='mt-10'>
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 gap-y-5'>
                    {tables?.map((table) => (
                        <li
                            className='cursor-pointer'
                            key={table.id_table}
                            onClick={() =>
                                handleRedirectToCreateOrder(
                                    table.id_table,
                                    table.status
                                )
                            }>
                            <CardTable table={table} />
                        </li>
                    ))}
                </ul>
            </div>
            <AlertMessageDialog
                title='Actualizar Orden'
                description='Esta mesa ya tiene una orden activa. ¿Desea actualizarla?.'
                onConfirm={() =>
                    handleRedirectToUpdateOrder(
                        Number(activeOrder?.table_id),
                        Number(activeOrder?.id_order)
                    )
                }
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    );
}
