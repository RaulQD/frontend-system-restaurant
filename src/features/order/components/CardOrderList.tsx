import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { OrderItem } from '@/types/order';
import { formatCurrency } from '../../../utils/formatCurrency';

type CardOrderListProps = {
    orderdish: OrderItem;
};

export default function CardOrderList({ orderdish }: CardOrderListProps) {

   const totalQuantityItems = (orderdish.price || 0) * orderdish.quantity;

    return (
        <Card>
            <CardContent className='p-2'>
                <div className='flex justify-start gap-2 font-outfit'>
                    <img
                        src={orderdish.image}
                        alt=''
                        className='h-14 w-14 rounded-xl'
                    />
                    <div className='w-full flex items-center justify-between gap-10'>
                        <div className='flex items-center justify-between gap-3'>
                            <CardTitle className='font-normal text-gray-600 line-clamp-1'>
                                {orderdish.dishes_name}
                            </CardTitle>
                            <span className='text-gray-500 text-sm'>
                                x{orderdish.quantity}
                            </span>
                        </div>
                        <span className='font-medium'>{formatCurrency(totalQuantityItems)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
