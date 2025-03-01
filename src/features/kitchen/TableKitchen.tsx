import Spinner from '@/components/Spinner';
import CardKitchen from './CardKitchen';
import { useGetOrdersForKitchen } from './useGetOrdersForKitchen';
import { useNavigate } from 'react-router-dom';
import EditOrderDetailsData from './EditOrderDetailsData';

export default function TableKitchen() {
    const { orders, isLoading, error } = useGetOrdersForKitchen();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }
    if (!orders?.length) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message}</p>
            </div>
        );
    }

    return (
        <>
            <div className='mb-5'>
                <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 '>
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
