import { Badge } from '@/components/ui/badge';
import { OrderDetails } from '@/types/order';
import { useUpdateItemStatus } from '../kitchen/useUpdateItemStatus';
import { useState } from 'react';

type OrderReadyDetailsProps = {
    orderDetails: OrderDetails;
};
export default function OrderReadyDetails({
    orderDetails,
}: OrderReadyDetailsProps) {
    const { updateStatus } = useUpdateItemStatus();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isAllServed, setIsAllServed] = useState(false);
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
        const readyItems = orderDetails.items
            .filter((item) => item.status === 'LISTO PARA SERVIR')
            .map((item) => item.id_item);
        console.log('Todos los ítems listos:', readyItems);
        if (selectedItems.length === readyItems.length) {
            setSelectedItems([]);
            console.log('Deseleccionando todos');
        } else {
            console.log('Seleccionando todos');
            setSelectedItems(readyItems);
        }
    };

    const handleChangeStatusItem = () => {
        selectedItems.forEach((itemId) => {
            updateStatus({
                orderId: Number(orderDetails.id_order),
                itemId,
                status: 'SERVIDO',
            });
        });
        setIsAllServed(true); 
    };

    return (
        <div>
            <div className='flex justify-between'>
                <span className='font-semibold'>
                    Mesa Nro. {orderDetails.table?.num_table}
                </span>
                <div className='flex items-center gap-2'>
                    <span>Estado:</span>
                    <Badge className='font-semibold'>
                        {orderDetails.order_status}
                    </Badge>
                </div>
            </div>
            <div className='mt-4'>
                <div className='flex justify-between items-center'>
                    <span className='font-semibold text-center'>Producto</span>
                    <span className='font-semibold'>Cantidad</span>
                    <span className='font-semibold'>Estado</span>
                    <input
                        type='checkbox'
                        checked={
                            selectedItems.length > 0 &&
                            selectedItems.length ===
                                orderDetails.items.filter(
                                    (item) =>
                                        item.status === 'LISTO PARA SERVIR'
                                ).length
                        }
                        className='text-center'
                        onChange={handleSelectAllItems}
                        disabled={isAllServed}
                    />
                </div>
                <div className='mt-2'>
                    {orderDetails.items.map((item) => (
                        <div
                            key={item.id_item}
                            className='flex justify-between items-center mb-2 last-of-type:mb-0'>
                            <span>{item.dishes_name}</span>
                            <span>{item.quantity}</span>
                            <Badge
                                className={`${
                                    item.status === 'LISTO PARA SERVIR'
                                        ? 'bg-[#e8edff] hover:bg-[#e8edff]/80'
                                        : 'bg-[#5cf25c] hover:bg-[#5cf25c]/80'
                                } text-black font-normal cursor-pointer`}>
                                {item.status}
                            </Badge>
                            <input
                                type='checkbox'
                                checked={selectedItems.includes(item.id_item) || isAllServed}
                                onChange={() =>
                                    handleCheckBoxChange(item.id_item)
                                }
                                disabled={item.status !== 'LISTO PARA SERVIR' || isAllServed}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Botón para actualizar todos los ítems seleccionados */}
            {selectedItems.length > 0 && (
                <button
                    onClick={handleChangeStatusItem}
                    disabled={isAllServed}
                    className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'>
                    Marcar como "SERVIDO" ({selectedItems.length})
                </button>
            )}
        </div>
    );
}
