import ResponsiveDialog from '@/components/ResponsiveDialog';
import CardDishes from './CardDishes';
import { useState } from 'react';
import { useDishes } from '../../dishes/useDishes';

export type Dish = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};
export default function MenuList() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };
    const { dishes, isLoadingDishes, error } = useDishes();
    const dish = [
        {
            id: 1,
            name: 'Pasta Bolognese',
            description: 'Pasta with rich tomato and meat sauce',
            price: 12.99,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 4,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 5,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 6,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 7,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 8,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 9,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 10,
            name: 'Grilled Chicken',
            description: 'Juicy grilled chicken with spices',
            price: 10.5,
            image: 'https://via.placeholder.com/150',
        },
    ];
    return (
        <>
            <section>
                <h1 className='font-medium font-outfit text-xl'>
                    Elije tu plato
                </h1>
                <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6'>
                    {dishes?.results.map((dish) => (
                        <li key={dish.id} onClick={handleOpenModal}>
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
