import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTables } from './useTables';
import { useEffect, useState } from 'react';
import CardTable from './CardTable';
import Spinner from '@/components/Spinner';
import { Tables } from '@/types/tables';
import { useGetOrderActiveForTable } from '../order/useGetOrderActiveForTable';
import { useUser } from '@/hooks/useUser';
import { useCreateOrder } from '../order/useCreateOrder';
import toast from 'react-hot-toast';
import { OrderCreateData } from '@/types/order';

export default function TableList() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const room = searchParams.get('room') || 'comedor principal';
    const [selectedTable, setSelectedTable] = useState<Tables['id_table']>();
    const { user } = useUser();
    const { activeOrder, isLoading: isOrderLoading } =
        useGetOrderActiveForTable(selectedTable || 0);
    const { createOrders } = useCreateOrder();
    const { tables, isLoading, isError, error } = useTables(room);

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
            if (!user?.employee?.id_employee) {
                toast.error(
                    'No se puede crear la orden, el usuario no tiene un id de empleado'
                );
                return;
            }
            const orderData: OrderCreateData = {
                table_id: tableId,
                employee_id: user.employee.id_employee,
            };
            createOrders(orderData, {
                onSuccess: (data) => {
                    if (data?.order?.id_order) {
                        navigate(
                            `/dashboard/table/${tableId}/order/${data.order.id_order}`
                        );
                    }
                },
            });
        }
    };
    useEffect(() => {
        if (activeOrder && selectedTable) {
            navigate(
                `/dashboard/table/${selectedTable}/order/${activeOrder?.id_order}`
            );
        }
    }, [activeOrder, selectedTable, navigate]);

    if (isError) {
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
    if (!tables?.length) {
        return (
            <div className='flex justify-center items-center pt-20'>
                <p className='text-lg'>{error?.message}</p>
            </div>
        );
    }

    return (
        <>
            {tables.length > 0 ? (
                <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-10 gap-y-5'>
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
            ) : (
                <div className='flex justify-center items-center pt-20'>
                    <p className='text-lg'>No hay mesas disponibles</p>
                </div>
            )}
        </>
    );
}
