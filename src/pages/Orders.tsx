import { Button } from '@/components/ui/button';
import FilterOrder from '@/features/order/components/FilterOrder';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';
import { useCreateOrder } from '@/features/order/useCreateOrder';
import { useUser } from '@/hooks/useUser';
import { Item, Order, OrderItem } from '@/types/order';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Orders() {
    //OBTENER EL NOMBRE DE NUMERO DE LA MESA SELECCIONADA DE LA URL
    //1. Importar el hook useParams de react-router-dom
    //2. Obtener el valor de la mesa de la URL
    const { tableId } = useParams<{ tableId: string }>();
    //3. Obtener el valor de la mesa de la URL
    const { user } = useUser();
    console.log(user);
    const { createOrders } = useCreateOrder();
    //CREAR EL ESTADO DE LOS ITEMS DE LA ORDEN
    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        {
            dish_id: 1,
            price: 12.99,
            quantity: 1,
        },
    ]);
    //4. Crear una función handleCreateOrder que cree una orden
    const handleCreateOrder = () => {
        if (!user?.id) {
            console.error('No se pudo obtener el id del usuario.');
            return;
        }

        const orderData: Order = {
            table_id: Number(tableId),
            employee_id: user.id,
            items: orderItems,
        };
        createOrders(orderData);
    };
    //5. Crear una función handleAddItemToOrder que agregue un item a la orden
    const handleAddItemToOrder = () => {};

    return (
        <>
            <section className='h-[90dvh] xl:flex xl:gap-x-4'>
                <div className='basis-4/4 lg:basis-3/4 overflow-y-auto '>
                    <h1 className='font-outfit text-xl font-medium mb-4'>
                        Orden de la Mesa {tableId}
                    </h1>
                    <div className='flex items-center gap-x-2 flex-nowrap max-w-full overflow-x-auto '>
                        <FilterOrder />
                    </div>
                    <div className='mt-8 mb-6'>
                        <MenuList />
                    </div>
                </div>
                <div className='lg:basis-1/4'>
                    <OrderList />
                </div>
            </section>
            <Button onClick={handleCreateOrder}>Add</Button>
            <pre>
                <code>{JSON.stringify(user, null, 2)}</code>
                <code>{JSON.stringify(createOrders, null, 2)}</code>
            </pre>
            <pre>
                <code>{JSON.stringify(tableId, null, 2)}</code>
            </pre>
        </>
    );
}
