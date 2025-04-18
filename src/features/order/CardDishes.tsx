import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import NotImage from '@/assets/not-image-found.png';
import { DishesType } from '@/types/dish';
import { formatCurrency } from '@/utils/formatCurrency';

type DishProps = {
    dish: DishesType;
};

export default function CardDishes({ dish }: DishProps) {
    return (
        <Card>
            <CardContent className='p-4'>
                <div className='flex justify-start gap-2'>
                    <img
                        src={dish.image_url || NotImage}
                        alt=''
                        className='h-20 w-20 rounded-xl'
                    />
                    <div className='w-full'>
                        <CardTitle className='text-base lg:text-xl font-semibold flex justify-between mb-2'>
                            <span className='line-clamp-1'>
                                {dish.dishes_name}
                            </span>
                            <span className='text-red-600'>
                                {formatCurrency(dish.price)}
                            </span>
                        </CardTitle>
                        <CardDescription className='text-sm text-gray-500 line-clamp-2 max-h-[3rem] overflow-hidden'>
                            {dish.dishes_description}
                        </CardDescription>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
