import { formatCurrency } from '@/utils/formatCurrency';
import { OrderDetails } from '../../types/order';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type OrderHistoryDetailsDataProps = {
    orderDetailsHistory: OrderDetails;
};

export default function OrderHistoryDetailsData({
    orderDetailsHistory,
}: OrderHistoryDetailsDataProps) {
    const statusOrder = (status: string) => {
        switch (status) {
            case 'PENDIENTE':
                return (
                    <Badge
                        variant='warning'
                        className='text-white font-semibold'>
                        PENDIENTE
                    </Badge>
                );
            case 'EN PREPARACION':
                return (
                    <Badge variant='info' className='text-white font-semibold'>
                        EN PREPARACIÓN
                    </Badge>
                );
            case 'LISTO PARA SERVIR':
                return (
                    <Badge
                        variant='served'
                        className='text-black font-semibold'>
                        LISTO PARA SERVIR
                    </Badge>
                );
            case 'LISTO PARA PAGAR':
                return (
                    <Badge
                        variant='successdark'
                        className='text-black font-semibold'>
                        LISTO PARA PAGAR
                    </Badge>
                );
            case 'SERVIDO':
                return (
                    <Badge
                        variant='success'
                        className='text-white font-semibold'>
                        SERVIDO
                    </Badge>
                );
            case 'CANCELADO':
                return (
                    <Badge
                        variant='destructive'
                        className='text-white font-semibold'>
                        CANCELADO
                    </Badge>
                );

            case 'PAGADO':
                return (
                    <Badge
                        variant='success'
                        className='text-white font-semibold'>
                        PAGADO
                    </Badge>
                );

            case 'CREADO':
                return (
                    <Badge
                        variant='default'
                        className='text-white font-semibold'>
                        CREADO
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
            <div className='flex flex-col gap-2 font-outfit'>
                <div className='flex items-center justify-start gap-2'>
                    <p className='font-semibold text-black'>Fecha:</p>
                    <span> {new Date(orderDetailsHistory?.created_at).toLocaleDateString()}</span>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    <p className='font-semibold text-black'>Total:</p>
                    <span>{formatCurrency(orderDetailsHistory.total)}</span>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    <p className='font-semibold text-black'>Mesero :</p>
                    <span>
                        {orderDetailsHistory.employee.names}{' '}
                        {orderDetailsHistory.employee.last_name}
                    </span>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    <p className='font-semibold text-black'>Mesa :</p>
                    <span>{orderDetailsHistory.table.num_table}</span>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    <p className='font-semibold text-black'>Estado: </p>
                    <span>{statusOrder(orderDetailsHistory.order_status)}</span>
                </div>
            </div>
            <Separator orientation='horizontal'/>
            <h3 className='font-outfit font-medium text-lg'>
                Platos solicitados
            </h3>
            <div className='w-full overflow-y-auto rounded-md border'>
                {orderDetailsHistory.items.length > 0 ? (
                    <Table className='w-full divide-y divide-gray-300'>
                        <TableHeader className='bg-slate-200'>
                            <TableRow>
                                <TableHead className='w-[100px] pl-4'>
                                    ID
                                </TableHead>
                                <TableHead className='text-center'>
                                    Productos
                                </TableHead>
                                <TableHead className='text-center'>
                                    Cantidad
                                </TableHead>
                                <TableHead className='text-center'>
                                    Precio
                                </TableHead>
                                <TableHead className='text-center'>
                                    Subtotal
                                </TableHead>
                                <TableHead className='text-center'>
                                    Estados
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderDetailsHistory.items.map((item) => (
                                <TableRow key={item.id_item}>
                                    <TableCell>{item.id_item}</TableCell>
                                    <TableCell className='text-center px-4'>
                                        {item.dishes_name}
                                    </TableCell>
                                    <TableCell className='text-center px-4'>
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell className='text-center px-4'>
                                        {formatCurrency(item.unit_price)}
                                    </TableCell>
                                    <TableCell className='text-center px-4'>
                                        {formatCurrency(item.subtotal)}
                                    </TableCell>
                                    <TableCell className='text-center px-4'>
                                        {statusOrder(item.status)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className='flex justify-center items-center h-32'>
                        <p className='text-gray-500'>
                            La orden se cancelo sin seleccionar productos.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
