import { Button } from '@/components/ui/button';
import CardOrderList from './CardOrderList';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { BiCart } from 'react-icons/bi';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function OrderList() {
    const [showCart, setShowCart] = useState(false);
    const orderDish = [
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
            <aside
                className={cn(
                    'fixed xl:static right-0 p-5 xl:p-0 flex flex-col gap-y-8 2xl:gap-y-4 h-full bg-white z-50 w-[90%] sm:w-[70%] lg:w-[50%] xl:w-full transition-all font-outfit',
                    showCart ? 'top-0 delay-300' : '-top-full'
                )}>
                <div className='pt-6 px-6 basis-1/12'>
                    <div className='relative'>
                        <Input
                            type='text'
                            id='search'
                            placeholder='Buscar empleados'
                            className='pl-10 py-7'
                        />
                        <Label id='search'>
                            <MagnifyingGlassIcon className='text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 text-lg' />
                        </Label>
                    </div>
                </div>

                <div className='basis-11/12 overflow-y-auto flex flex-col lg:p-6 bg-white rounded-lg'>
                    <section className='basis-1/12'>
                        <h1 className='text-xl font-medium font-outfit'>
                            Detalles de la orden
                        </h1>
                    </section>
                    <ul className='basis-8/12 max-h-full overflow-y-auto'>
                        {orderDish.map((dish) => (
                            <li key={dish.id} className='mb-3'>
                                <CardOrderList orderdish={dish} />
                            </li>
                        ))}
                    </ul>
                    <section className='basis-3/12 flex flex-col justify-between gap-y-2 pt-2'>
                        <ul className='space-y-1 2xl:space-y-3'>
                            <li className='flex items-center justify-between'>
                                <p className='text-gray-500'>Subtotal</p>
                                <span className='text-lg font-bold'>S/250</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <p className='text-gray-500'>IGV(18%)</p>
                                <span className='text-lg font-bold'>
                                    {' '}
                                    S/.50
                                </span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <p className='text-gray-500'>Total</p>
                                <span className='text-lg font-bold'>S/300</span>
                            </li>
                        </ul>
                        <Button
                            variant={'principal'}
                            className='w-full hover:tracking-widest transition-all'>
                            Confirmar Orden
                        </Button>
                    </section>
                </div>
            </aside>
            <Button
                className='xl:hidden fixed bottom-0 right-0  w-14 h-14 bg-teal-700 text-white'
                onClick={() => setShowCart(true)}>
                <BiCart className='text-2xl' />
            </Button>

            <div
                role='button'
                className={`bg-black/40 fixed z-40 xl:hidden transition-all ${
                    showCart
                        ? 'w-full h-full right-0 top-0'
                        : 'w-0 h-0 left-0 bottom-0 delay-300'
                }`}
                onClick={() => setShowCart(false)} // Cerrar el sidebar al hacer click fuera
            />
        </>
    );
}
