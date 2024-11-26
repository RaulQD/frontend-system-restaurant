import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OrdersList } from '@/types/order';
import { ClockIcon, ComponentInstanceIcon } from '@radix-ui/react-icons';
import { useGetOrderByID } from '../useGetOrderByID';
import { useLocation, useNavigate } from 'react-router-dom';
import ResponsiveDialog from '@/components/ResponsiveDialog';
import OrderDetailsKitchen from './OrderDetailsKitchen';

type CardKitchenProps = {
    order: OrdersList;
    badgeStatus: (status: string) => JSX.Element;
};

export default function CardKitchen({ order, badgeStatus }: CardKitchenProps) {
    const { orderDetails } = useGetOrderByID(order.id_order);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderDetail = queryParams.get('orderDetail');
    const isOpen = orderDetail === orderDetails?.id_order.toString();
    const handleOrderDetails = () => {
        navigate(`?orderDetail=${order.id_order}`);
    };

    return (
        <>
            <Card className='font-outfit ' onClick={handleOrderDetails}>
                <CardHeader className='p-4'>
                    <div className='flex items-center justify-between'>
                        <h1 className=' text-sm font-medium'>{order.names}</h1>

                        <span> {badgeStatus(order.order_status)}</span>
                    </div>
                </CardHeader>
                <CardContent className='px-4 pb-4'>
                    <Separator className='mb-4' />
                    <div>
                        <div className='flex items-center justify-start gap-2'>
                            <ClockIcon className='w-3 h-3 text-gray-500' />
                            <p className='text-sm text-gray-500'>
                                {new Date(order.created_at).toLocaleString()}
                                {/* 12:30pm, 8 de agosto, 2024 */}
                            </p>
                        </div>
                        <div className='flex items-center justify-start gap-2'>
                            <ComponentInstanceIcon className='w-3 h-3 text-gray-500' />
                            <p className='text-sm font-normal text-gray-500'>
                                Pedido #123 - Mesa {order.num_table}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <ResponsiveDialog
                title='Detalles del Pedido'
                isOpen={isOpen}
                description='Aquí puedes ver el detalle del pedido.'
                setIsOpen={() =>
                    navigate(location.pathname, { replace: true })
                }>
                <OrderDetailsKitchen
                    setIsOpen={() =>
                        navigate(location.pathname, { replace: true })
                    }
                    orderDetails={orderDetails!}
                />
            </ResponsiveDialog>
        </>
    );
}
