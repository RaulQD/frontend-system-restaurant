import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OrdersList } from '@/types/order';
import { ClockIcon, ComponentInstanceIcon } from '@radix-ui/react-icons';


type CardKitchenProps = {
    order: OrdersList;
};

export default function CardKitchen({ order }: CardKitchenProps) {
    
    const statusOrder = (status: string) => {
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
            <Card className='font-outfit'>
                <CardHeader className='p-4'>
                    <div className='flex items-center justify-between'>
                        <h1 className=' text-sm font-medium'>{order.names}</h1>

                        <span> {statusOrder(order.order_status)}</span>
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
            {/* <ResponsiveDialog
                title='Detalles del Pedido'
                open={open}
                description='Aquí puedes ver el detalle del pedido.'>
                <OrderDetailsKitchen orderDetails={orderDetails!} />
            </ResponsiveDialog> */}
        </>
    );
}
