import Spinner from '@/components/Spinner';
import { useGetOrdersReady } from './useGetOrdersReady';
import CardOrder from './CardOrder';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { socket } from '@/lib/sockets';

export default function TableOrdersReady() {
    const navigate = useNavigate();
    const { orders, isError, isLoading, error } = useGetOrdersReady();

    useEffect(() => {
        socket.on('update-list-kitchen', () => {
            
        })
    })

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Spinner />
            </div>
        );
    }
    if (isError) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message}</p>
            </div>
        );
    }

    if (!orders?.length) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message || 'No hay Ordenes listas para servir.'}</p>
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
                                        `?order-details=${order.id_order}`
                                );
                            }}>
                            <CardOrder order={order} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
