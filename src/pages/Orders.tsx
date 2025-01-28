import { useDishes } from '@/features/dishes/useDishes';
import { useTableInfo } from '@/features/manage-table/useTableInfo';
import FilterOrder from '@/features/order/components/FilterOrder';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';
import { useAddItemToOrder } from '@/features/order/useAddItemToOrder';
import { useCreateOrder } from '@/features/order/useCreateOrder';
import { useUser } from '@/hooks/useUser';
import { OrderCreateData, OrderItem } from '@/types/order';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function Orders() {
    //CREAR EL ESTADO DE LOS ITEMS DE LA ORDEN
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [specialRequests, setSpecialRequests] = useState<string>('');
    const navigate = useNavigate();
    //OBTENER EL NUMERO DE LA MESA SELECCIONADA DE LA URL
    const { tableId } = useParams<{ tableId: string }>();
    const { user } = useUser();
    const { dishes } = useDishes();
    const { createOrders } = useCreateOrder();
    const { addItemToOrder } = useAddItemToOrder();
    const { tableById } = useTableInfo(Number(tableId));

    //4. Crear una función handleCreateOrder que cree una orden
    const handleCreateOrder = () => {
        //VALIDAR SI EL USUARIO TIENE UN ID DE EMPLEADO
        if (!user?.employee?.id_employee) {
            toast.error(
                'No se puede crear la orden, el usuario no tiene un id de empleado'
            );
            return;
        }
        const orderData: OrderCreateData = {
            table_id: Number(tableId),
            employee_id: user.employee.id_employee,
            items: orderItems,
        };
        createOrders(orderData, {
            onSuccess: (data) => {
                if (data?.order?.id_order) {
                    setOrderItems([]); //limpiar los items de la orden
                    setSpecialRequests(''); //limpiar las solicitudes especiales
                    //navegar a la pagina de las mesas
                    navigate(`/dashboard/tables/`);
                }
            },
        });
    };
    // const handleAddItemToOrder = (dishId: number) => {
    //     addItemToOrder({
    //         orderId: Number(tableId),
    //         dishId,
    //         quantity: 1,
    //         special_requests: specialRequests,
    //     });
    // };

  //  5. Crear una función handleAddItemToOrder que agregue un item a la orden
    const handleAddItemToOrder = (dishId: number) => {
        const dish = dishes?.results.find((d) => d.id === dishId);
        //VALIDAR SI EL ITEM YA ESTA EN LA ORDEN
        const itemsExists = orderItems.find((item) => item.dish_id === dishId);
        if (itemsExists) {
            itemsExists.quantity += 1;
            setOrderItems([...orderItems]);
        } else {
            //AGREGAR EL ITEM A LA ORDEN
            const item: OrderItem = {
                dish_id: dishId,
                dishes_name: dish?.dishes_name,
                image_url: dish?.image_url,
                quantity: 1,
                unit_price: dish?.price,
                status: 'PENDIENTE',
                special_requests: specialRequests,
            };
            setOrderItems([...orderItems, item]);
        }
    };

    return (
        <>
            <section className='h-[90dvh] xl:flex xl:gap-x-4'>
                <div className='lg:basis-2/3 overflow-y-auto '>
                    <h1 className='font-outfit text-xl font-medium mb-4'>
                        Crear nueva orden en la mesa {tableById?.num_table}
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
                        orderItems={orderItems}
                        handleCreateOrder={handleCreateOrder}
                    />
                </div>
            </section>
        </>
    );
}
