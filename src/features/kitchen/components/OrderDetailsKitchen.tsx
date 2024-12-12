import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OrderDetails } from '@/types/order';
import { useUpdateItemStatus } from '../useUpdateItemStatus';
import { Badge } from '@/components/ui/badge';

type OrderDetailsKitchenProps = {
    orderDetails: OrderDetails;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function OrderDetailsKitchen({
    orderDetails,
    setIsOpen,
}: OrderDetailsKitchenProps) {
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
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='px-3 py-2 text-left text-sm font-semibold'>
                            #
                        </th>
                        <th className='px-3 py-2 text-left text-sm font-semibold'>
                            Productos
                        </th>
                        <th className='px-3 py-2 text-left text-sm font-semibold'>
                            Cantidad
                        </th>
                        <th className='px-3 py-2 text-left text-sm font-semibold'>
                            Subtotal
                        </th>
                        <th className='px-3 py-2 text-left text-sm font-semibold'>
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
                            <td className='px-3 py-2 text-sm'>
                                {item.dishes_name}
                            </td>
                            <td className='px-3 py-2 text-sm'>
                                {item.quantity}
                            </td>
                            <td className='px-3 py-2 text-sm'>
                                {item.subtotal}
                            </td>
                            <td className='px-3 py-2 text-sm'>
                             {item.status === 'SERVIDO' ? (
                                 <Badge variant={'success'}>
                                        Servido
                                 </Badge>
                             ):(
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
                                    <option value='PENDIENTE'>
                                        Pendiente
                                    </option>
                                    <option value='EN PREPARACION'>
                                        En preparacion
                                    </option>
                                    <option value='SERVIDO'>Servido</option>
                                </select>
                            </form>
                             )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Separator className='my-4' />
            <div className='flex items-center justify-end gap-5'>
                <Button variant={'secondary'} onClick={() => setIsOpen(false)}>
                    Cerrar
                </Button>
                <Button variant={'principal'}>Imprimir</Button>
            </div>
        </div>
    );
}
