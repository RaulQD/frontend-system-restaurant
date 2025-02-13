import { useTableInfo } from '@/features/manage-table/useTableInfo';
import FilterOrder from '@/features/order/FilterOrder';
import MenuList from '@/features/order/MenuList';
import OrderList from '@/features/order/OrderList';
import { useDecreaseQuantity } from '@/features/order/useDecreaseQuantity';
import { useGetOrderActiveForTable } from '@/features/order/useGetOrderActiveForTable';
import { useParams } from 'react-router-dom';
export default function Orders() {
    //OBTENER EL NUMERO DE LA MESA SELECCIONADA DE LA URL
    const { tableId } = useParams<{ tableId: string }>();
    const { activeOrder } = useGetOrderActiveForTable(Number(tableId));
    const { tableById } = useTableInfo(Number(tableId));
    const { decreaseQuantity } = useDecreaseQuantity();
    const orderId = activeOrder?.id_order || 0;

    const handleDecreaseQuantity = (itemId: number) => {
        if(!orderId) return;
        decreaseQuantity({ orderId, itemId, quantity: 1 });
    };
  

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
