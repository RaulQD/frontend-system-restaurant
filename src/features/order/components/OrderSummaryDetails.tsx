import { OrderSummary } from '@/types/order';

type OrderSummaryDetailsProps = {
    orderSummary: OrderSummary;
};

export default function OrderSummaryDetails({
    orderSummary,
}: OrderSummaryDetailsProps) {
    return (
        <div>
            <div>
                <h1>Datos de tú pedido</h1>
            </div>
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='px-3 py-2 text-left text-sm font-semibold'>
                            Productos
                        </th>
                        <th className='px-3 py-2 text-left text-sm font-semibold'>
                            Cantidad
                        </th>
                        <th className='px-3 py-2 text-left text-sm font-semibold'>
                            Precio
                        </th>
                        <th className='px-3 py-2 text-left text-sm font-semibold'>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orderSummary.orderItems.map((item) => (
                        <tr key={item.id_item}>
                            <td className='px-3 py-2 text-sm'>
                                {item.dishes_name}
                            </td>
                            <td className='px-3 py-2 text-sm'>
                                {item.quantity}
                            </td>
                            <td className='px-3 py-2 text-sm'>
                                {item.unit_price}
                            </td>
                            <td className='px-3 py-2 text-sm'>
                                {item.subtotal}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
