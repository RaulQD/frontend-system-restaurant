import { formatCurrency } from '@/utils/formatCurrency';
import { OrderDetails } from '../../types/order';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type OrderHistoryDetailsDataProps = {
    orderDetails: OrderDetails;
};

export default function OrderHistoryDetailsData({
    orderDetails,
}: OrderHistoryDetailsDataProps) {
    console.log('Items de la orden:', orderDetails.items);

    return (
        <div className='w-full overflow-y-auto'>
            <Table className='w-full divide-y divide-gray-300'>
                <TableHeader className='bg-slate-200'>
                    <TableRow>
                        <TableHead className='w-[100px] pl-4'>ID</TableHead>
                        <TableHead className='text-center'>Productos</TableHead>
                        <TableHead className='text-center'>Cantidad</TableHead>
                        <TableHead className='text-center'>Precio</TableHead>
                        <TableHead className='text-center'>Subtotal</TableHead>
                        <TableHead className='text-center'>Estados</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderDetails.items.map((item) => (
                        <TableRow key={item.id_item}>
                            <TableCell>{item.id_item}</TableCell>
                            <TableCell className='text-center px-4'>
                                {item.dishes_name}
                            </TableCell>
                            <TableCell className='text-center px-4'>
                                {item.quantity}
                            </TableCell>
                            <TableCell className='text-center px-4'>
                                {formatCurrency(item.unit_price)}
                            </TableCell>
                            <TableCell className='text-center px-4'>
                                {formatCurrency(item.subtotal)}
                            </TableCell>
                            <TableCell className='text-center px-4'>
                                <Badge
                                    variant={
                                        item.status !== 'SERVIDO'
                                            ? 'success'
                                            : 'destructive'
                                    }
                                    className='text-white font-semibold'>
                                    {item.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <table className='w-full border-collapse'>
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
                            Subtotal
                        </th>
                        <th className='px-3 py-2 text-center text-sm font-semibold'>
                            Estados
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.items.map(
                        (item) => (
                            console.log(
                                'unit_price:',
                                item.unit_price,
                                'Formato:',
                                formatCurrency(item.unit_price)
                            ),
                            (
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
                                    <td>
                                        <Badge
                                            variant={
                                                item.status !== 'SERVIDO'
                                                    ? 'success'
                                                    : 'destructive'
                                            }
                                            className='text-white font-semibold'
                                            >
                                            {item.status}
                                        </Badge>
                                    </td>
                                </tr>
                            )
                        )
                    )}
                </tbody>
            </table> */}
        </div>
    );
}
