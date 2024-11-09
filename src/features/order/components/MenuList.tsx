import ResponsiveDialog from '@/components/ResponsiveDialog';
import CardDishes from './CardDishes';
import { useState } from 'react';
import { useDishes } from '../../dishes/useDishes';
import Spinner from '@/components/Spinner';
import { OrderItem } from '@/types/order';
type MenuListProps = {
    handleAddItemToOrder: (item: OrderItem) => void;
};

export default function MenuList({ handleAddItemToOrder }: MenuListProps) {
    const [isOpen, setIsOpen] = useState(false);

    // const handleOpenModal = () => {
    //     setIsOpen(true);
    // };
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
    return (
        <>
            <section>
                <h1 className='font-medium font-outfit text-xl'>
                    Elije tu plato
                </h1>
                <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6'>
                    {dishes?.results.map((dish) => (
                        <li key={dish.id} onClick={() => handleAddItemToOrder}>
                            <CardDishes dish={dish} />
                        </li>
                    ))}
                </ul>
            </section>
            <ResponsiveDialog
                title='pollo a la brasa'
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                description='Agrega un plato al menú de tu restaurante'>
                <p>Contenido del plato</p>
            </ResponsiveDialog>
        </>
    );
}
