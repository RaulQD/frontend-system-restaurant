import { useDishes } from '@/features/dishes/useDishes';
import { useTableInfo } from '@/features/manage-table/useTableInfo';
import FilterOrder from '@/features/order/components/FilterOrder';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';
import { useAddItemToOrder } from '@/features/order/useAddItemToOrder';
import { useCreateOrder } from '@/features/order/useCreateOrder';
import { useDecreaseQuantity } from '@/features/order/useDecreaseQuantity';
import { useGetOrderActiveForTable } from '@/features/order/useGetOrderActiveForTable';
import { useUser } from '@/hooks/useUser';
import { Order, OrderCreateData, OrderItem } from '@/types/order';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { decreaseItemQuantity } from '../services/apiOrder';

export default function Orders() {
    //OBTENER EL NUMERO DE LA MESA SELECCIONADA DE LA URL
    const { tableId } = useParams<{ tableId: string }>();
    const { activeOrder } = useGetOrderActiveForTable(Number(tableId));
    const { tableById } = useTableInfo(Number(tableId));
    const { decreaseQuantity } = useDecreaseQuantity();
    const orderId = activeOrder?.id_order || 0;

    const handleDecreaseQuantity = (dishId: number) => {
        if(!orderId) return;
        decreaseQuantity({ orderId, dishId, quantity: 1 });
    };
    // const handleDecreaseQuantity = (dishId: number) => {
    //     const itemExists = orderItems.findIndex(item => item.dish_id === dishId);
    //     if(itemExists !== -1){
    //         const updateOrderItems = [...orderItems];
    //         if(updateOrderItems[itemExists].quantity > 1){
    //             updateOrderItems[itemExists] = {
    //                 ...updateOrderItems[itemExists],
    //                 quantity: updateOrderItems[itemExists].quantity - 1
    //             }
    //             setOrderItems(updateOrderItems);
    //         }else{
    //             const newOrderItems = updateOrderItems.filter(item => item.dish_id !== dishId);
    //             setOrderItems(newOrderItems);
    //         }
    //     }
    // }

    return (
        <>
            <section className='h-[90dvh] xl:flex xl:gap-x-4'>
                <div className='lg:basis-2/3 overflow-y-auto '>
                    <h1 className='font-outfit text-xl font-medium mb-4'>
                        Orden de la mesa #{tableById?.num_table}
                    </h1>
                    <div className='flex items-center gap-x-2 flex-nowrap max-w-full overflow-x-auto '>
                        <FilterOrder />
                    </div>
                    <div className='mt-8 mb-6'>
                        <MenuList orderId={orderId} />
                    </div>
                </div>
                <div className='lg:basis-1/3'>
                    <OrderList
                        activeOrder={activeOrder}
                        handleDecreaseQuantity={handleDecreaseQuantity}
                    />
                </div>
            </section>
        </>
    );
}
