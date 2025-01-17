import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { OrderItem } from '@/types/order';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Badge } from '@/components/ui/badge';

type CardOrderListProps = {
    orderdish: OrderItem;
};

export default function CardOrderList({ orderdish }: CardOrderListProps) {
    const totalQuantityItems = (orderdish.unit_price || 0) * orderdish.quantity;

    return (
        <Card>
            <CardContent className='p-2'>
                <div className='flex justify-start gap-2 font-outfit'>
                    <img
                        src={orderdish.image}
                        alt=''
                        className='h-14 w-14 rounded-xl md:h-12 md:w-12 sm:h-10 sm:w-10'
                    />
                    <div className='w-full flex xl:flex-col 2xl:flex-row xl:items-start items-center 2xl:items-center justify-between xl:justify-center 2xl:justify-between'>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center lg:justify-between sm:gap-3'>
                            <CardTitle className='font-normal text-gray-600 line-clamp-1'>
                                {orderdish.dishes_name}
                            </CardTitle>
                            <span className='text-gray-500 text-sm'>
                                x{orderdish.quantity}
                            </span>
                        </div>
                        <div className='flex flex-col items-end gap-1'>
                            <span className='font-medium'>
                                {formatCurrency(totalQuantityItems)}
                            </span>
                            <Badge color='success' className='text-[0.5rem]'>
                                {orderdish.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
