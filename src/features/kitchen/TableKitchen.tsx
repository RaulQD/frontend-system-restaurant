import Spinner from '@/components/Spinner';
import CardKitchen from './CardKitchen';
import { useGetOrdersForKitchen } from './useGetOrdersForKitchen';
import { useNavigate } from 'react-router-dom';
import EditOrderDetailsData from './EditOrderDetailsData';
import { useEffect } from 'react';
import { socket } from '@/lib/sockets';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function TableKitchen() {
    const { orders, isLoading, error } = useGetOrdersForKitchen();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        socket.on('new-order-to-send-kitchen', (newOrder) => {
            console.log('📢 Nueva orden recibida:', newOrder);
            toast.success(newOrder.message);
            //ACTUALIZAR LA DATA DE ORDENES EN CACHE
            queryClient.invalidateQueries({ queryKey: ['ordersKitchen'] });
        });
        socket.on('update-list-kitchen',() => {
            console.log('📢 Actualizando lista de cocina');
            queryClient.invalidateQueries({ queryKey: ['ordersKitchen'] });
        })
        socket.on('add-item-order', (addItem) => {
        console.log('📢 Se ha agregado un nuevo item a la orden')
        toast.success(addItem.message);
        queryClient.invalidateQueries({ queryKey: ['ordersKitchen'] });
    
        })
        return () => {
            socket.off('new-order-to-send-kitchen');
            socket.off('update-list-kitchen');
        };
    }, [queryClient]);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }
    if (!orders?.length) {
        console.log('❌ no hay ordenes en cocina');
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message || 'No hay ordenes pendientes en cocina.'} </p>
            </div>
        );
    }

    return (
        <>
            <div className='mb-5'>
                <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 '>
                    {orders?.map((order) => (
                        <li
                            key={order.id_order}
                            className='cursor-pointer'
                            onClick={() => {
                                navigate(
                                    location.pathname +
                                        `?orderDetails=${order.id_order}`
                                );
                            }}>
                            <CardKitchen order={order} />
                        </li>
                    ))}
                </ul>
            </div>
            <EditOrderDetailsData />
        </>
    );
}
