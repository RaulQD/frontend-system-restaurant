import CardDishes from './CardDishes';
import { useDishes } from '../../dishes/useDishes';
import Spinner from '@/components/Spinner';
import { useState } from 'react';
type MenuListProps = {
    handleAddItemToOrder: (
        dishId: number,
        quantity: number,
        specialRequests?: string
    ) => void;
};

export default function MenuList({ handleAddItemToOrder }: MenuListProps) {
    const [selectedDish, setSelectedDish] = useState<number[]>([]);
    const { dishes, isLoadingDishes, error } = useDishes();
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
    const onAddItem = (
        dishId: number,
        quantity: number = 1,
        specialRequests: string = ''
    ) => {
        // Si el plato ya está seleccionado, deseleccionarlo
        if (selectedDish.includes(dishId)) {
            setSelectedDish(selectedDish.filter((id) => id !== dishId));
        } else {
            handleAddItemToOrder(dishId, quantity, specialRequests);
            setSelectedDish([...selectedDish, dishId]); // Selecciona el nuevo plato
        }
    };
    //SELECCIONAR EL PLATO Y CAMBIAR DE COLOR AL SELECCIONARLO
    const isSelected = (dishId: number): boolean => {
        return selectedDish.includes(dishId);
    };

    return (
        <>
            <section>
                <h1 className='font-medium font-outfit text-xl'>
                    Elije tu plato
                </h1>
                <ul className='grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-4 mt-6'>
                    {dishes?.results.map((dish) => (
                        <li
                            key={dish.id}
                            onClick={() => onAddItem(dish.id, 1, '')}>
                            <CardDishes dish={dish} isSelected={isSelected} />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
