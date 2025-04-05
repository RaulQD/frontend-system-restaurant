import { Badge } from '@/components/ui/badge';
import { OrderDetails } from '@/types/order';
import { useUpdateItemStatus } from '../kitchen/useUpdateItemStatus';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCheckIcon } from 'lucide-react';
import { PiHandCoins } from 'react-icons/pi';
import { Separator } from '@/components/ui/separator';
import SpinnerMini from '@/components/SpinnerMini';

type OrderReadyDetailsProps = {
    orderDetails: OrderDetails;
};
export default function OrderReadyDetails({
    orderDetails,
}: OrderReadyDetailsProps) {
    const { updateStatus, isPending } = useUpdateItemStatus();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const navigate = useNavigate();

    const handleCheckBoxChange = (itemId: number) => {
        //manejar el item individual
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
        console.log('Ítems seleccionados:', selectedItems); // 👀 Verificar qué ítems están siendo seleccionados
    };

    //manejar la seleccion de todos los items
    const handleSelectAllItems = () => {
        //SELECCIONAR TODO LOS ITEMS  DE LA ORDEN
        const readyItems = orderDetails.items.map((item) => item.id_item);

        if (selectedItems.length === readyItems.length) {
            //deseleccionar todos los listos para servir
            setSelectedItems([]);
        } else {
            //seleccionar todos los listos para servir
            setSelectedItems(readyItems);
        }
    };

    const handleChangeStatusItem = () => {
        selectedItems.forEach((itemId) => {
            updateStatus(
                {
                    orderId: Number(orderDetails.id_order),
                    itemId,
                    status: 'SERVIDO',
                },
                {
                    onSuccess: () => {
                        navigate(location.pathname, { replace: true });
                    },
                }
            );
        });
    };
    const statusBadge = (status: string) => {
        switch (status) {
            case 'LISTO PARA PAGAR':
                return (
                    <Badge className='bg-[#5cf25c] hover:bg-[#5cf25c]/80 text-black font-normal font-outfit flex items-center gap-1'>
                        <PiHandCoins className='w-4 h-4' />
                        LISTO PARA PAGAR
                    </Badge>
                );
            case 'LISTO PARA SERVIR':
                return (
                    <Badge className='bg-[#e8edff] hover:bg-[#e8edff]/80 text-black font-normal font-outfit flex items-center gap-1'>
                        <CheckCheckIcon className='w-4 h-4' />
                        LISTO PARA SERVIR
                    </Badge>
                );
            default:
                return '';
        }
    };

    return (
        <div>
            <div className='flex justify-between'>
                <span className='font-semibold'>
                    Mesa Nro. {orderDetails.table?.num_table}
                </span>
                <div className='flex items-center gap-2'>
                    <p>Estado:</p>
                    <span>{statusBadge(orderDetails.order_status)}</span>
                </div>
            </div>
            <div className='mt-4 overflow-y-auto'>
                <table className='w-full border-collapse '>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='px-3 py-2 text-center text-sm font-semibold font-outfit'>
                                Producto
                            </th>
                            <th className='px-3 py-2 text-center text-sm font-semibold font-outfit'>
                                Cantidad
                            </th>
                            <th className='px-3 py-2 text-center text-sm font-semibold font-outfit'>
                                Estado
                            </th>
                            <th className='px-3 py-2 text-center text-sm font-semibold font-outfit'>
                                <input
                                    type='checkbox'
                                    checked={
                                        selectedItems.length > 0 &&
                                        selectedItems.length ===
                                            orderDetails.items.filter(
                                                (item) =>
                                                    item.status ===
                                                    'LISTO PARA SERVIR'
                                            ).length
                                    }
                                    onChange={handleSelectAllItems}
                                    className='accent-teal-300 cursor-pointer'
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.items.map((item) => (
                            <tr key={item.id_item}>
                                <td className='px-3 py-2 text-sm text-center font-outfit'>
                                    {item.dishes_name}
                                </td>
                                <td className='px-3 py-2 text-sm text-center font-outfit'>
                                    {item.quantity}
                                </td>
                                <td className='px-3 py-2 text-sm text-center font-outfit'>
                                    <Badge
                                        className={`${
                                            item.status === 'LISTO PARA SERVIR'
                                                ? 'bg-[#e8edff] hover:bg-[#e8edff]/80'
                                                : 'bg-[#5cf25c] hover:bg-[#5cf25c]/80'
                                        } text-black font-normal cursor-pointer`}>
                                        {item.status}
                                    </Badge>
                                </td>
                                <td className='px-3 py-2 text-sm text-center'>
                                    <input
                                        type='checkbox'
                                        checked={selectedItems.includes(
                                            item.id_item
                                        )}
                                        onChange={() =>
                                            handleCheckBoxChange(item.id_item)
                                        }
                                        disabled={
                                            item.status !== 'LISTO PARA SERVIR'
                                        }
                                        className='accent-teal-300 cursor-pointer'
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Botón para actualizar todos los ítems seleccionados */}
            {selectedItems.length > 0 && (
                <>
                    <Separator orientation='horizontal' className='mt-4' />
                    <Button
                        onClick={handleChangeStatusItem}
                        disabled={isPending}
                        variant={'principal'}
                        className='mt-4 text-white font-semibold py-2 px-4 rounded'>
                        {isPending ? (
                            <SpinnerMini />
                        ) : (
                            ` Servir (${selectedItems.length})`
                        )}
                    </Button>
                </>
            )}
        </div>
    );
}
