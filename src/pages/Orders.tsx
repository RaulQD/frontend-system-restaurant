import { Button } from '@/components/ui/button';
import FilterOrder from '@/features/order/components/FilterOrder';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';
import { useCreateOrder } from '@/features/order/useCreateOrder';
import { useOrderItems } from '@/features/order/useOrderItems';
import { useUser } from '@/hooks/useUser';
import { DishType } from '@/types/dish';
import { Order, OrderItem } from '@/types/order';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Orders() {
    //OBTENER EL NOMBRE DE NUMERO DE LA MESA SELECCIONADA DE LA URL
    const { tableId } = useParams<{ tableId: string }>();
    //3. Obtener el valor de la mesa de la URL
    const { user } = useUser();
    const { createOrders } = useCreateOrder();
    //CREAR EL ESTADO DE LOS ITEMS DE LA ORDEN
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    //4. Crear una función handleCreateOrder que cree una orden
    const handleCreateOrder = () => {
        //VALIDAR SI EL USUARIO TIENE UN ID DE EMPLEADO
        if (!user?.employee.id_employee) {
            console.error('No se pudo obtener el id del empleado.');
            return;
        }
        const orderData: Order = {
            table_id: Number(tableId),
            employee_id: user.employee.id_employee,
            items: orderItems,
        };
        createOrders(orderData);
        console.log(orderData);
    };
    //5. Crear una función handleAddItemToOrder que agregue un item a la orden
    const handleAddItemToOrder = (dishId: number) => {
        //VALIDAR SI EL ITEM YA ESTA EN LA ORDEN
        const itemsExists = orderItems.find((item) => item.dish_id === dishId);
        if (itemsExists) {
            itemsExists.quantity += 1;
            setOrderItems([...orderItems]);
        } else {
            //AGREGAR EL ITEM A LA ORDEN
            const item: OrderItem = {
                dish_id: dishId,
                quantity: 1,
            };
            setOrderItems([...orderItems, item]);
        }
    };
    
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
                        <MenuList handleAddItemToOrder={handleAddItemToOrder} />
                    </div>
                </div>
                <div className='lg:basis-1/4'>
                    <OrderList handleCreateOrder={handleCreateOrder}/>
                </div>
            </section>
        </>
    );
}
