import { Button } from '@/components/ui/button';
import CardOrderList from './CardOrderList';
import { BiCart } from 'react-icons/bi';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Order, OrderItem } from '@/types/order';
import { formatCurrency } from '@/utils';

type OrderListProps = {
    activeOrder: Order | undefined;
    handleDecreaseQuantity: (dishId: number) => void;
};

export default function OrderList({
    activeOrder,
    handleDecreaseQuantity,
}: OrderListProps) {
    const [showCart, setShowCart] = useState(false);
    const subTotal =
        activeOrder?.items.reduce(
            (acc, items) => acc + items.quantity * (items.unit_price || 0),
            0
        ) || 0;
    //calcular el igv
    const IGV = subTotal * (18 / 100);
    const total = subTotal + IGV;

    return (
        <>
            <aside
                className={`fixed xl:static right-0 p-5 xl:p-0 flex flex-col gap-y-8 2xl:gap-y-4 h-full bg-white z-50 w-[90%] sm:w-[70%] lg:w-[60%] xl:w-full transition-all font-outfit',
                    ${showCart ? 'top-0 delay-300' : '-top-full'}`}>
                <div className='pt-0 px-0 lg:pt-6 lg:px-6 basis-1/12'>
                    <div className='flex flex-col gap-y-2 font-outfit mb-4'>
                        <h1 className='text-xl font-medium'>
                            Detalle de la orden
                        </h1>
                        <span className='text-gray-500 text-sm'>
                            #FH-0000001
                        </span>
                    </div>
                    <Separator orientation='horizontal' />
                </div>

                <div className='basis-11/12 overflow-y-auto flex flex-col lg:p-6 bg-white rounded-lg'>
                    <ul className='basis-8/12 max-h-full overflow-y-auto'>
                        {activeOrder?.items.map((item) => (
                            <li key={item.id_item} className='mb-3'>
                                <CardOrderList
                                    orderItem={item}
                                    handleDecreaseQuantity={
                                        handleDecreaseQuantity
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                    <section className='basis-4/12 flex flex-col justify-between gap-y-2 pt-4'>
                        <ul className='space-y-1 2xl:space-y-3'>
                            <li className='flex items-center justify-between'>
                                <p className='text-gray-500'>Subtotal</p>
                                <span className='text-lg font-bold'>
                                    {formatCurrency(subTotal)}
                                </span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <p className='text-gray-500'>IGV(18%)</p>
                                <span className='text-lg font-bold'>
                                    {' '}
                                    {formatCurrency(IGV)}
                                </span>
                            </li>
                            <Separator orientation='horizontal' />
                            <li className='flex items-center justify-between'>
                                <p className='text-gray-500'>Total</p>
                                <span className='text-lg font-bold'>
                                    {formatCurrency(total)}
                                </span>
                            </li>
                        </ul>
                        <Button
                            variant={'secondary'}
                            className='w-full hover:tracking-widest transition-all'>
                            Cancelar
                        </Button>
                        <Button
                            variant={'principal'}
                            className='w-full hover:tracking-widest transition-all'>
                            Enviar a cocina
                        </Button>
                        <Button
                            variant={'default'}
                            className='w-full hover:tracking-widest transition-all'>
                            Realizar Pago
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
