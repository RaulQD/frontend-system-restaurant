import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useDishes } from '@/features/dishes/useDishes';
import FilterOrder from '@/features/order/components/FilterOrder';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';
import { useCreateOrder } from '@/features/order/useCreateOrder';
import { useUser } from '@/hooks/useUser';
import { OrderCreateData, OrderItem } from '@/types/order';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Orders() {
    //OBTENER EL NOMBRE DE NUMERO DE LA MESA SELECCIONADA DE LA URL
    const { tableId } = useParams<{ tableId: string }>();
    //3. Obtener el valor de la mesa de la URL
    const { user } = useUser();
    const { createOrders } = useCreateOrder();
    const { dishes } = useDishes();
    //CREAR EL ESTADO DE LOS ITEMS DE LA ORDEN
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    //CREAR EL ESTADO DE LAS SOLICITUDES ESPECIALES
    const [specialRequests, setSpecialRequests] = useState<string>('');
    //capturar el id de la orden creada
    const [orderId, setOrderId] = useState<number | null>(null);

    //4. Crear una función handleCreateOrder que cree una orden
    const handleCreateOrder = () => {
        //VALIDAR SI EL USUARIO TIENE UN ID DE EMPLEADO
        if (!user?.employee.id_employee) {
            console.error('No se pudo obtener el id del empleado.');
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
                    setOrderId(data.order.id_order);
                    setOrderItems([]); //limpiar los items de la orden
                    setSpecialRequests(''); //limpiar las solicitudes especiales
                    //navegar a la pagina de lasm esas
                    //navigate(`/admin/dashboard/tables/`);
                }
            },
        });
    };
    //5. Crear una función handleAddItemToOrder que agregue un item a la orden
    const handleAddItemToOrder = (dishId: number) => {
        //OBTENER LA INFORMACIÓN DEL PLATO
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
                image: dish?.image_url,
                quantity: 1,
                unit_price: dish?.price,
                special_requests: specialRequests,
            };
            setOrderItems([...orderItems, item]);
        }
    };

    return (
        <>
            <section className='h-[90dvh] xl:flex xl:gap-x-4'>
                <div className='lg:basis-3/4 overflow-y-auto '>
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
                    <OrderList
                        orderItems={orderItems}
                        orderId={orderId!}
                        handleCreateOrder={handleCreateOrder}
                    />
                </div>
            </section>
        </>
    );
}
