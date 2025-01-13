import Spinner from '@/components/Spinner';
import CardKitchen from './CardKitchen';
import { useGetOrdersForKitchen } from './useGetOrdersForKitchen';
import { Badge } from '@/components/ui/badge';
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
    if (error) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error.message}</p>
            </div>
        );
    }
    const badgeStatus = (status: string) => {
        switch (status) {
            case 'PENDIENTE':
                return (
                    <Badge
                        variant='warning'
                        className='text-white font-semibold'>
                        Pendiente
                    </Badge>
                );
            case 'EN PROCESO':
                return (
                    <Badge variant='info' className='text-black font-semibold'>
                        En Proceso
                    </Badge>
                );

            default:
                return (
                    <Badge
                        variant='secondary'
                        className='text-white font-semibold'>
                        Desconocido
                    </Badge>
                );
        }
    };
    return (
        <>
            <div className='mb-5'>
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 '>
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
                            <CardKitchen
                                order={order}
                                badgeStatus={badgeStatus}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <EditOrderDetailsData />
        </>
    );
}
