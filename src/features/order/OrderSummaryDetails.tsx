import { OrderSummary, ProcessPaymentDataValues } from '@/types/order';
import { formatCurrency } from '../../utils/formatCurrency';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useUser } from '@/hooks/useUser';
import { useProcessPayment } from './useProcessPayment';
import { useNavigate } from 'react-router-dom';
import SpinnerMini from '@/components/SpinnerMini';

type OrderSummaryDetailsProps = {
    orderSummary: OrderSummary;
};

export default function OrderSummaryDetails({
    orderSummary,
}: OrderSummaryDetailsProps) {
    const [showPayment, setShowPayment] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();
    const { processPayment, isLodingPayment } = useProcessPayment();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProcessPaymentDataValues>({
        defaultValues: {
            employee_id: user?.id!,
            amount_received: '',
        },
    });
    useEffect(() => {
        if (user) {
            setValue('employee_name', user.employee.full_name);
        }
    }, [user, setValue]);

    const subTotal =
        orderSummary.orderItems.reduce(
            (acc, item) => acc + item.quantity * (item.unit_price || 0),
            0
        ) || 0;

    // Obtener el monto recibido en tiempo real
    const amountReceived = watch('amount_received');
    // Calcular cambio en tiempo real
    const changeAmount = amountReceived ? Number(amountReceived) - subTotal : 0;

    const desglosarIGV = (subTotal: number) => {
        const basePrice = subTotal / 1.18;
        const igv = subTotal - basePrice;
        return { basePrice, igv };
    };
    const handlePayment = (formData: ProcessPaymentDataValues) => {
        if (!user) return;
        const data = {
            orderId: orderSummary.orderId,
            amount_received: Number(formData.amount_received),
            employee_id: user?.id,
        };
        processPayment(data, {
            onSuccess: () => {
                reset();
                navigate('/dashboard/tables');
            },
        });
    };

    return (
        <>
            <div className='w-full max-h-40 overflow-y-auto'>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='px-3 py-2 text-left text-sm font-semibold'>
                                Productos
                            </th>
                            <th className='px-3 py-2 text-sm font-semibold text-center'>
                                Cantidad
                            </th>
                            <th className='px-3 py-2 text-center text-sm font-semibold'>
                                Precio
                            </th>
                            <th className='px-3 py-2 text-center text-sm font-semibold'>
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderSummary.orderItems.map((item) => (
                            <tr key={item.id_item}>
                                <td className='px-3 py-1 text-sm'>
                                    {item.dishes_name}
                                </td>
                                <td className='px-3 py-1 text-sm text-center'>
                                    {item.quantity}
                                </td>
                                <td className='px-3 py-1 text-sm text-center'>
                                    {formatCurrency(item.unit_price)}
                                </td>
                                <td className='px-3 py-1 text-sm text-center'>
                                    {formatCurrency(item.subtotal)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Separator />
            <div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>Subtotal</p>
                        <p className=''>
                            {formatCurrency(desglosarIGV(subTotal).basePrice)}
                        </p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>Impuestos</p>
                        <p className=''>
                            {formatCurrency(desglosarIGV(subTotal).igv)}
                        </p>
                    </div>
                    <div className='flex justify-between mb-4'>
                        <p className='font-semibold'>Total</p>
                        <p className='font-semibold'>
                            {formatCurrency(subTotal)}
                        </p>
                    </div>
                </div>
                <Separator />
                {!showPayment ? (
                    <div className='flex justify-end mt-4 items-center gap-2'>
                        <Button
                            variant={'secondary'}
                            onClick={() =>
                                navigate(location.pathname, {
                                    replace: true,
                                })
                            }>
                            Cancelar
                        </Button>
                        <Button
                            variant={'principal'}
                            onClick={() => setShowPayment(true)}>
                            Comfirmar y Proceder al Pago
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(handlePayment)} noValidate>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2 mt-4'>
                                <Label htmlFor='amount_received'>
                                    Atendido por :
                                </Label>
                                <Input
                                    type='text'
                                    placeholder='Nombre del mesero'
                                    {...register('employee_name')}
                                    disabled
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label
                                    htmlFor='amount_received'
                                    id='amount_received'>
                                    Monto recibido :
                                </Label>
                                <Input
                                    type='number'
                                    id='amount_received'
                                    placeholder='Monto recibido'
                                    {...register('amount_received', {
                                        required: 'Ingrese el monto recibido.',
                                        min: {
                                            value: subTotal,
                                            message:
                                                'El monto recibido debe ser mayor o igual al total de la orden.',
                                        },
                                    })}
                                />
                                {errors.amount_received && (
                                    <ErrorMessage>
                                        {errors.amount_received?.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor='change_amount'>Cambio : </Label>
                                <Input
                                    type='text'
                                    placeholder='Cambio'
                                    value={formatCurrency(changeAmount)}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className='mt-4 flex items-center justify-end gap-4'>
                            <Button
                                variant={'muted'}
                                onClick={() =>
                                    navigate(location.pathname, {
                                        replace: true,
                                    })
                                }>
                                Cancelar
                            </Button>
                            <Button variant={'principal'}>
                                {isLodingPayment ? (
                                    <div className='flex justify-center'>
                                        <SpinnerMini />
                                    </div>
                                ) : (
                                    'Realizar Pago'
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
