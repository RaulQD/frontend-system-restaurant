import CardDishes from './CardDishes';
import { useDishes } from '../../dishes/useDishes';
import Spinner from '@/components/Spinner';
import { Order } from '@/types/order';
import { useAddItemToOrder } from '../useAddItemToOrder';
type MenuListProps = {
    // handleAddItemToOrder: (dishId: number, quantity: number) => void;
    orderId: Order['id_order'];
};

export default function MenuList({ orderId }: MenuListProps) {
    const { dishes, isLoadingDishes, error } = useDishes();
    const { addItemToOrder } = useAddItemToOrder();

    if (isLoadingDishes) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }
    if (!dishes?.results.length) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message}</p>
            </div>
        );
    }
    const onAddItem = (dishId: number, quantity: number = 1) => {
        addItemToOrder({
            order_id: orderId,
            dish_id: dishId,
            quantity,
        });
    };

    return (
        <>
            <section>
                <h1 className='font-medium font-outfit text-xl'>
                    Elije tu plato
                </h1>
                <ul className='grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-4 mt-6'>
                    {dishes?.results.map((dish) => (
                        <li key={dish.id} onClick={() => onAddItem(dish.id, 1)}>
                            <CardDishes dish={dish} />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
