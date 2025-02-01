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

export default function Orders() {
    //CREAR EL ESTADO DE LOS ITEMS DE LA ORDEN
    const navigate = useNavigate();
    //OBTENER EL NUMERO DE LA MESA SELECCIONADA DE LA URL
    const { tableId } = useParams<{ tableId: string }>();
    const { activeOrder } = useGetOrderActiveForTable(Number(tableId));
    const { user } = useUser();
    const { dishes } = useDishes();
    const { createOrders } = useCreateOrder();
    const { decreaseQuantity } = useDecreaseQuantity();
    const { tableById } = useTableInfo(Number(tableId));

    const orderId = activeOrder?.id_order || 0;
    //Crear una función handleCreateOrder que cree una orden
    // const handleCreateOrder = () => {
    //     //VALIDAR SI EL USUARIO TIENE UN ID DE EMPLEADO
    //     if (!user?.employee?.id_employee) {
    //         toast.error(
    //             'No se puede crear la orden, el usuario no tiene un id de empleado'
    //         );
    //         return;
    //     }
    //     const orderData: OrderCreateData = {
    //         table_id: Number(tableId),
    //         employee_id: user.employee.id_employee,
    //         // items: orderItems,
    //     };
    //     createOrders(orderData, {
    //         onSuccess: (data) => {
    //             if (data?.order?.id_order) {
    //                 // setOrderItems([]); //limpiar los items de la orden
    //                 navigate(`/dashboard/tables/`); //navegar a la pagina de las mesas
    //             }
    //         },
    //     });
    // };
    // const {
    //     activeOrder,
    //     isLoading: isOrderLoading,
    //     error: orderError,
    // } = useGetOrderActiveForTable(Number(tableId));
    // const { addItemToOrder } = useAddItemToOrder();
    // const handleAddItemToOrder = (dishId: number, quantity: number = 1, orderId:Order['id_order']) => {
    //     // if (!activeOrder?.id_order) return;
    //     addItemToOrder({
    //         order_id: orderId,
    //         dish_id: dishId,
    //         quantity,
    //     });
    // };

    //Crear una función handleAddItemToOrder que agregue un item a la orden
    const handleAddItemToOrder = (dishId: number, quantity: number = 1) => {
        console.log('Add item to order', dishId, quantity);
    };
    // const handleAddItemToOrder = (dishId: number, quantity: number = 1) => {
    //     const dish = dishes?.results.find((d) => d.id === dishId);
    //     if (!dish) return; // Si no se encuentra el platillo, salir.
    //     //CLONAR EL ARRAY DE LOS ITEMS DE LA ORDEN
    //     //BUSCAR SI EL ITEM EXISTE EN LA ORDEN
    //     const itemExists = orderItems.findIndex(
    //         (item) => item.dish_id === dishId
    //     );
    //     console.log(itemExists);
    //     if (itemExists !== -1) {
    //         const updatedOrderItems = [...orderItems];
    //         updatedOrderItems[itemExists] = {
    //             ...updatedOrderItems[itemExists],
    //             quantity: updatedOrderItems[itemExists].quantity + quantity,
    //         };
    //         setOrderItems(updatedOrderItems);
    //         toast.success('Se ha agregado un platillo a la orden');
    //     } else {
    //         const newItem: OrderItem = {
    //             dish_id: dishId,
    //             dishes_name: dish.dishes_name,
    //             image_url: dish.image_url,
    //             quantity,
    //             unit_price: dish.price,
    //             status: 'PENDIENTE',
    //         };
    //         setOrderItems([...orderItems, newItem]);
    //         toast.success('Se ha agregado un platillo a la orden');
    //     }
    // };
    const handleDecreaseQuantity = (dishId: number) => {
        console.log('Decrease quantity', dishId);
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
