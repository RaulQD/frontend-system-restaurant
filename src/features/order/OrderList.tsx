import { Button } from '@/components/ui/button';
import CardOrderList from './CardOrderList';
import { BiCart } from 'react-icons/bi';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/types/order';
import { formatCurrency } from '@/utils';
import { useSendOrderToKitchen } from './useSendOrderToKitchen';
import { useCancelOrder } from './useCancelOrder';
import { useNavigate } from 'react-router-dom';
import OrderSummaryData from './OrderSummaryData';
import SpinnerMini from '@/components/SpinnerMini';

type OrderListProps = {
    activeOrder: Order;
    handleDecreaseQuantity: (dishId: number) => void;
};

export default function OrderList({
    activeOrder,
    handleDecreaseQuantity,
}: OrderListProps) {
    const navigate = useNavigate();
    const [showCart, setShowCart] = useState(false);
    const { sendOrder, isPending } = useSendOrderToKitchen();
    const { cancellationOrder, isCancelOrder } = useCancelOrder();
    const subTotal = activeOrder?.items.reduce(
        (acc, item) => acc + item.unit_price * item.quantity,
        0
    );

    const isOrderIsEmpty = !activeOrder?.items.length;
    const isOrderBusy = activeOrder?.items.every(
        (item) =>
            item.status === 'LISTO PARA SERVIR' || item.status === 'SERVIDO'
    );

    //función para calcular el igv
    const desglosarIGV = (subTotal: number) => {
        const basePrice = subTotal / 1.18;
        const igv = subTotal - basePrice;
        return { basePrice, igv };
    };
    //DESAHABILITAR EL BOTON DISMINUIR Y AUMENTAR LA CANTIDAD DE PLATOS CUANDO LA ORDEN ESTA EN ESTADO DE SERVIDO, LISTO PARA SERVIR O EN PREPARACION, SI ESTA EN ESTADO PENDIENTE SE HABILITA
    const handleDisableButton = (status: string) => {
        switch (status) {
            case 'PENDIENTE':
                return false;
            case 'EN PREPARACION':
                return true;
            case 'LISTO PARA SERVIR':
                return true;
            case 'SERVIDO':
                return true;
            default:
                return false;
        }
    };

    const handleSendOrder = () => {
        if (!activeOrder?.id_order) return;
        sendOrder(activeOrder?.id_order, {
            onSuccess: () => {
                navigate('/dashboard/table');
            },
        });
    };
    const handleCancelOrder = () => {
        if (!activeOrder?.id_order) return;

        cancellationOrder(activeOrder?.id_order, {
            onSuccess: () => {
                navigate('/dashboard/table');
            },
        });
    };
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
                            {activeOrder?.order_number}
                        </span>
                    </div>
                    <Separator orientation='horizontal' />
                </div>

                <div className='basis-11/12 overflow-y-auto flex flex-col lg:p-6 bg-white rounded-lg'>
                    {activeOrder?.items.length ? (
                        <ul className='basis-8/12 max-h-full overflow-y-auto'>
                            {activeOrder?.items.map((item) => (
                                <li key={item.id_item} className='mb-3'>
                                    <CardOrderList
                                        orderItem={item}
                                        handleDecreaseQuantity={
                                            handleDecreaseQuantity
                                        }
                                        handleDisableButton={
                                            handleDisableButton
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='flex justify-center items-center h-full'>
                            <p>No hay items agregados a la orden.</p>
                        </div>
                    )}
                    <section className='basis-4/12 flex flex-col justify-between gap-y-2 pt-4'>
                        <ul className='space-y-1 2xl:space-y-3'>
                            <li className='flex items-center justify-between'>
                                <p className='text-gray-500'>Subtotal</p>
                                <span className='text-lg font-bold'>
                                    {formatCurrency(
                                        desglosarIGV(subTotal).basePrice
                                    )}
                                </span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <p className='text-gray-500'>IGV(18%)</p>
                                <span className='text-lg font-bold'>
                                    {formatCurrency(desglosarIGV(subTotal).igv)}
                                </span>
                            </li>
                            <Separator orientation='horizontal' />
                            <li className='flex items-center justify-between'>
                                <p className='text-gray-500'>Total</p>
                                <span className='text-lg font-bold'>
                                    {formatCurrency(subTotal)}
                                </span>
                            </li>
                        </ul>
                        <Button
                            variant='destructive'
                            className='w-full hover:tracking-widest transition-all text-white'
                            disabled={isOrderBusy}
                            onClick={() => handleCancelOrder()}>
                            {isCancelOrder ? <SpinnerMini /> : 'Cancelar Orden'}
                        </Button>
                        <Button
                            variant={'default'}
                            disabled={isOrderIsEmpty || isOrderBusy}
                            className='w-full hover:tracking-widest transition-all'
                            onClick={() => handleSendOrder()}>
                            {isPending ? <SpinnerMini /> : 'Enviar a cocina'}
                        </Button>
                        <Button
                            type='button'
                            variant={'principal'}
                            className='w-full hover:tracking-widest transition-all'
                            disabled={!isOrderBusy || isOrderIsEmpty}
                            onClick={() =>
                                navigate(
                                    location.pathname + `?orderSummary=true`
                                )
                            }>
                            Confirmar Pago
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
            <OrderSummaryData />
        </>
    );
}
