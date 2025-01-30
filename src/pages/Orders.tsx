import { useDishes } from '@/features/dishes/useDishes';
import { useTableInfo } from '@/features/manage-table/useTableInfo';
import FilterOrder from '@/features/order/components/FilterOrder';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';
import { useCreateOrder } from '@/features/order/useCreateOrder';
import { useUser } from '@/hooks/useUser';
import { OrderCreateData, OrderItem } from '@/types/order';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function Orders() {
    //CREAR EL ESTADO DE LOS ITEMS DE LA ORDEN
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const navigate = useNavigate();
    //OBTENER EL NUMERO DE LA MESA SELECCIONADA DE LA URL
    const { tableId } = useParams<{ tableId: string }>();
    const { user } = useUser();
    const { dishes } = useDishes();
    const { createOrders } = useCreateOrder();
    const { tableById } = useTableInfo(Number(tableId));

    //Crear una función handleCreateOrder que cree una orden
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
                    navigate(`/dashboard/tables/`); //navegar a la pagina de las mesas
                }
            },
        });
    };
    //Crear una función handleAddItemToOrder que agregue un item a la orden

    const handleAddItemToOrder = (
        dishId: number,
        quantity: number = 1,
        specialRequests: string = ''
    ) => {
        const dish = dishes?.results.find((d) => d.id === dishId);
        if (!dish) return; // Si no se encuentra el platillo, salir.
        //CLONAR EL ARRAY DE LOS ITEMS DE LA ORDEN
        //BUSCAR SI EL ITEM EXISTE EN LA ORDEN
        const itemExists = orderItems.findIndex(
            (item) => item.dish_id === dishId
        );
        console.log(itemExists);
        if (itemExists !== -1) {
            const updatedOrderItems = [...orderItems];
            updatedOrderItems[itemExists] = {
                ...updatedOrderItems[itemExists],
                quantity: updatedOrderItems[itemExists].quantity + quantity,
                special_requests: specialRequests,
            };
            setOrderItems(updatedOrderItems);
        } else {
            console.log('no existe');
            const newItem: OrderItem = {
                dish_id: dishId,
                dishes_name: dish.dishes_name,
                image_url: dish.image_url,
                quantity,
                unit_price: dish.price,
                status: 'PENDIENTE',
                special_requests: specialRequests,
            };
            setOrderItems([...orderItems, newItem]);
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
