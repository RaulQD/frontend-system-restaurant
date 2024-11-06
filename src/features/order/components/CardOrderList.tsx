import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Dish } from './MenuList';

type CardOrderListProps = {
    orderdish: Dish;
};

export default function CardOrderList({ orderdish }: CardOrderListProps) {
    return (
        <Card>
            <CardContent className='p-2'>
                <div className='flex justify-start gap-2 font-outfit'>
                    <img
                        src={orderdish.image}
                        alt=''
                        className='h-14 w-14 rounded-xl'
                    />
                    <div className=' max-w-full flex items-center justify-between gap-3'>
                        <div className='flex items-center justify-start '>
                            <CardTitle className=' font-normal text-gray-600 line-clamp-1'>
                                {orderdish.name}
                            </CardTitle>
                            <span className='text-gray-500 text-sm'>x3</span>
                        </div>
                        <span className='font-medium'>
                            S/.{orderdish.price}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
