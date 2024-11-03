import { Button } from '@/components/ui/button';
import CardOrderList from './CardOrderList';

export default function OrderList() {
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
    ];
    return (
        <aside className=' fixed xl:static right-0 p-5 xl:p-0 flex flex-col gap-y-8 2xl:gap-y-4 h-full z-50 w-[90%] sm:w-[70%] lg:w-[50%] xl:w-full transition-all font-outfit'>
            <div className='basis-11/12 overflow-y-auto flex flex-col p-6 bg-white rounded-lg'>
                <section className='basis-1/12'>
                    <h1 className='text-2xl font-medium font-outfit'>
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
                            <span className='text-lg font-bold'> S/.50</span>
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
    );
}
