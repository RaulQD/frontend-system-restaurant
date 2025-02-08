import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OrderDetails } from '@/types/order';
import { useUpdateItemStatus } from './useUpdateItemStatus';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

type OrderDetailsKitchenProps = {
    orderDetails: OrderDetails;
};
const status = [
    { value: 'PENDIENTE', label: 'Pendiente' },
    { value: 'EN PREPARACION', label: 'En preparacion' },
    { value: 'LISTO PARA SERVIR', label: 'Listo para servir' },
    { value: 'SERVIDO', label: 'Servido' },
];

export default function OrderDetailsKitchen({
    orderDetails,
}: OrderDetailsKitchenProps) {
    const navigate = useNavigate();
    const orderId = orderDetails.id_order;
    const { updateStatus } = useUpdateItemStatus();
    const handleUpdateStatus = (
        orderId: number,
        itemId: number,
        status: string
    ) => {
        updateStatus({ orderId, itemId, status });
    };

    return (
        <div className=''>
            <div className='text-center mb-4'>
                <h2 className='text-lg font-bold'>COMPROBANTE TICKET</h2>
                <p className='text-sm'>"Foodie Hub"</p>
                <p className='text-sm'>RUC: 10176222757</p>
                <p className='text-sm'>
                    DIRECCIÓN: Jr. Grau Nº 960 <br /> Ubicación: Chachapoyas,
                    Amazonas
                </p>
                <p className='text-sm'>Tel.: 951530849</p>
                <hr className='my-2 border-gray-300' />
                <p className='text-start text-sm font-medium'>
                    Mesa: {orderDetails.num_table}
                </p>
            </div>
            <div className='w-full max-h-60 overflow-y-auto'>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='px-3 py-2 text-left text-sm font-semibold'>
                                #
                            </th>
                            <th className='px-3 py-2 text-center text-sm font-semibold'>
                                Productos
                            </th>
                            <th className='px-3 py-2 text-center text-sm font-semibold'>
                                Cantidad
                            </th>
                            <th className='px-3 py-2 text-center text-sm font-semibold'>
                                Subtotal
                            </th>
                            <th className='px-3 py-2 text-center text-sm font-semibold'>
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.items.map((item, index) => (
                            <tr
                                key={item.id_item}
                                className={`${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                }`}>
                                <td className='px-3 py-2 text-sm'>
                                    {item.id_item}
                                </td>
                                <td className='px-3 py-2 text-sm text-center'>
                                    {item.dishes_name}
                                </td>
                                <td className='px-3 py-2 text-sm text-center'>
                                    {item.quantity}
                                </td>
                                <td className='px-3 py-2 text-sm text-center'>
                                    {formatCurrency(item.subtotal)}
                                </td>
                                <td className='px-3 py-2 text-sm text-center'>
                                    {item.status === 'SERVIDO' ? (
                                        <Badge variant={'success'}>
                                            Servido
                                        </Badge>
                                    ) : (
                                        <form>
                                            <select
                                                defaultValue={item.status}
                                                className='border border-gray-300 rounded-md text-sm p-1 w-full'
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLSelectElement>
                                                ) =>
                                                    handleUpdateStatus(
                                                        orderId,
                                                        item.id_item,
                                                        e.target.value
                                                    )
                                                }>
                                                {status.map((status) => (
                                                    <option
                                                        key={status.value}
                                                        value={status.value}>
                                                        {status.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </form>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Separator className='my-4' />
            <div className='flex items-center justify-end gap-5'>
                <Button
                    variant={'secondary'}
                    onClick={() =>
                        navigate(location.pathname, { replace: true })
                    }>
                    Cerrar
                </Button>
                <Button variant={'principal'}>Imprimir</Button>
            </div>
        </div>
    );
}
