import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { OrderItem } from '@/types/order';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatCurrency';
import { useParams } from 'react-router-dom';

type CardOrderListProps = {
    orderItem: OrderItem;
    handleDecreaseQuantity: (dishId: number) => void;
    handleDisableButton: (status: string) => boolean;
    handleChangeStatusItem: (
        orderId: number,
        itemId: number,
        status: string
    ) => void;
};

export default function CardOrderList({
    orderItem,
    handleDecreaseQuantity,
    handleDisableButton,
    handleChangeStatusItem,
}: CardOrderListProps) {
    const { orderId } = useParams();
    const totalQuantityItems = orderItem.unit_price * orderItem.quantity;
    //OBTENER LOS COLORES DEPENDIENDO DEL ESTADO DE LA ORDEN CON SWITCH
    const statusOrderItemsColor = (status: string) => {
        switch (status) {
            case 'PENDIENTE':
                return (
                    <Badge
                        variant='warning'
                        className='text-white font-semibold'>
                        Pendiente
                    </Badge>
                );
            case 'EN PREPARACION':
                return (
                    <Badge variant='info' className='text-black font-semibold'>
                        En preparación
                    </Badge>
                );
            case 'LISTO PARA SERVIR':
                return (
                    <Badge
                        variant='muted'
                        className='text-black font-semibold'
                        onClick={() =>
                            handleChangeStatusItem(
                                Number(orderId),
                                orderItem.id_item,
                                'SERVIDO'
                            )
                        }>
                        Listo para servir
                    </Badge>
                );
            case 'SERVIDO':
                return (
                    <Badge
                        variant='success'
                        className='text-white font-semibold'>
                        Servido
                    </Badge>
                );
            case 'PAGADO':
                return (
                    <Badge
                        variant='success'
                        className='text-white font-semibold'>
                        Completado
                    </Badge>
                );
            default:
                return 'primary';
        }
    };

    return (
        <Card>
            <CardContent className='p-2'>
                <div className='flex justify-start items-center gap-2 font-outfit '>
                    <img
                        src={orderItem.image_url}
                        alt={orderItem.dishes_name}
                        className='h-14 w-14 rounded-xl md:h-12 md:w-12 sm:h-10 sm:w-10'
                    />
                    <div className='w-full flex flex-row items-center justify-between '>
                        <div className='flex flex-col justify-between'>
                            <div className='flex items-center justify-between gap-1'>
                                <CardTitle className='font-normal text-gray-600 line-clamp-1 '>
                                    {orderItem.dishes_name}
                                </CardTitle>
                                <span className='text-gray-500 text-sm'>
                                    (x {orderItem.quantity})
                                </span>
                            </div>
                            <div className='flex justify-start items-center gap-4 mt-1'>
                                <Button
                                    variant={'principal'}
                                    size={'sm'}
                                    className={
                                        orderItem.status === 'PENDIENTE'
                                            ? ''
                                            : 'pointer-events-none opacity-50'
                                    }
                                    onClick={() =>
                                        handleDecreaseQuantity(
                                            orderItem.id_item
                                        )
                                    }>
                                    -
                                </Button>
                                <span>{orderItem.quantity}</span>
                                <Button
                                    variant={'principal'}
                                    size={'sm'}
                                    className={
                                        handleDisableButton(orderItem.status)
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }>
                                    +
                                </Button>
                            </div>
                        </div>
                        <div className='flex flex-col items-end gap-1'>
                            <span className='font-medium'>
                                {formatCurrency(totalQuantityItems)}
                            </span>

                            {statusOrderItemsColor(orderItem.status)}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
