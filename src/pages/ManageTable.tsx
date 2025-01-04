import AlertMessageDialog from '@/components/AlertMessageDialog';
import FilterButton from '@/components/FilterButton';
import Spinner from '@/components/Spinner';

import CardTable from '@/features/manage-table/components/CardTable';
import { useTables } from '@/features/manage-table/useTables';
import { getRooms } from '@/services/apiRooms';
import { Rooms } from '@/types/rooms';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCreateOrder } from '../features/order/useCreateOrder';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import { OrderCreateData } from '@/types/order';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/services/apiOrder';

export default function ManageTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const room = searchParams.get('room') || 'comedor principal';
    const navigate = useNavigate();
    const { tables, isLoading, error } = useTables(room);
    // const { createOrders } = useCreateOrder();
    const { user } = useUser();
    useEffect(() => {
        if (!searchParams.has('room')) {
            searchParams.set('room', 'comedor principal');
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams]);
    const handleRedirectToUpdateOrder = () => {};

    //CREANDO LA ORDEN
    const createOrderMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: (data) => {
            navigate(
                `/dashboard/tables/${data.order.table_id}/order/${data.order.id_order}`
            );
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

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
        <section>
            <div>
                <div className='flex flex-col md:flex-row items-start justify-between gap-6'>
                    <div>
                        <h1 className='font-outfit text-xl font-medium'>
                            Gestionar Mesas
                        </h1>
                        <div className='flex items-center justify-start gap-4 mt-2'>
                            <div className='flex items-center justify-center gap-3'>
                                <span className='bg-blue-300 w-2 h-2 py-1 px-1 block rounded-full'></span>
                                <p className='text-sm font-outfit font-medium'>
                                    Disponibles
                                </p>
                            </div>
                            <div className='flex items-center justify-center gap-3'>
                                <span className='bg-red-300 w-2 h-2 py-1 px-1 block rounded-full'></span>
                                <p className='text-sm font-outfit font-medium'>
                                    Ocupados
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Rooms tables */}
                    <FilterButton<Rooms>
                        filterValue='room'
                        queryKey={['room']}
                        queryFn={getRooms}
                        getValue={(room) => room.room_name}
                        getLabel={(room) => room.room_name}
                        useSelectOnMobile={false}
                    />
                </div>
            </div>
            <div className='mt-10'>
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 gap-y-5'>
                    {tables?.map((table) => (
                        <li
                            className='cursor-pointer'
                            key={table.id_table}
                            onClick={() => {
                                if (user?.employee?.id_employee) {
                                    createOrderMutation.mutate({
                                        table_id: table.id_table,
                                        employee_id: user.employee.id_employee,
                                    });
                                }
                            }}>
                            <CardTable table={table} />
                        </li>
                    ))}
                </ul>
            </div>
            <AlertMessageDialog
                title='Actualizar Orden'
                description='Esta mesa ya tiene una orden activa. ¿Desea actualizarla?.'
                onConfirm={() => handleRedirectToUpdateOrder()}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </section>
    );
}
