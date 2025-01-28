import { useTableInfo } from '@/features/manage-table/useTableInfo';
import FilterOrder from '@/features/order/components/FilterOrder';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';
import { useGetOrderActiveForTable } from '@/features/order/useGetOrderActiveForTable';
import { useParams } from 'react-router-dom';

export default function UpdateOrder() {
    const { tableId } = useParams<{ tableId: string }>();
    const { tableById } = useTableInfo(Number(tableId));
    const {
        activeOrder,
        isLoading: isOrderLoading,
        error: orderError,
    } = useGetOrderActiveForTable(Number(tableId));
    const handleAddItemToOrder = (dishId: number) => {};

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
                    <OrderList orderItems={activeOrder?.items || []} />
                </div>
            </section>
        </>
    );
}
