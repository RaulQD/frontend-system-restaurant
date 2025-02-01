import { useTableInfo } from '@/features/manage-table/useTableInfo';
import FilterOrder from '@/features/order/components/FilterOrder';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';
import { useAddItemToOrder } from '@/features/order/useAddItemToOrder';
import { useGetOrderActiveForTable } from '@/features/order/useGetOrderActiveForTable';
import { useParams } from 'react-router-dom';
import { useDecreaseQuantity } from '@/features/order/useDecreaseQuantity';

export default function UpdateOrder() {
    const { tableId } = useParams<{ tableId: string }>();
    const { tableById } = useTableInfo(Number(tableId));
    const { addItemToOrder } = useAddItemToOrder();
    const { decreaseQuantity } = useDecreaseQuantity();
    const {
        activeOrder,
        isLoading: isOrderLoading,
        error: orderError,
    } = useGetOrderActiveForTable(Number(tableId));
    const handleAddItemToOrder = (dishId: number, quantity: number = 1) => {
        if (!activeOrder?.id_order) return;
        addItemToOrder({
            order_id: activeOrder?.id_order || 0,
            dish_id: dishId,
            quantity,
        });
    };
    const handleDecreaseQuantity = (dishId: number) => {
        if (!activeOrder?.id_order) return;
        decreaseQuantity({
            orderId: activeOrder.id_order || 0,
            dishId,
            quantity: 1,
        });
    };

    return (
        <>
            <section className='h-[90vh] xl:flex xl:gap-x-4'>
                <div className='lg:basis-2/3 overflow-y-auto '>
                    <h1 className='font-outfit text-xl font-medium mb-4'>
                        Actualizar nueva orden en la mesa {tableById?.num_table}
                    </h1>
                    <div className='flex items-center gap-x-2 flex-nowrap max-w-full overflow-x-auto '>
                        <FilterOrder />
                    </div>
                    <div className='mt-8 mb-6'>
                        <MenuList handleAddItemToOrder={handleAddItemToOrder} />
                    </div>
                </div>
                <div className='lg:basis-1/3'>
                    <OrderList
                        orderItems={activeOrder?.items || []}
                        handleDecreaseQuantity={handleDecreaseQuantity}
                    />
                </div>
            </section>
        </>
    );
}
