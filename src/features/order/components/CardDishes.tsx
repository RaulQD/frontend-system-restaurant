import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import NotImage from '@/assets/not-image-found.png';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { DishesType } from '@/types/dish';

type DishProps = {
    dish: DishesType;
};

export default function CardDishes({ dish }: DishProps) {
    return (
        <Card className='cursor-pointer'>
            <CardContent className='p-4'>
                <div className='flex justify-start gap-2'>
                    <img
                        src={dish.image_url || NotImage}
                        alt=''
                        className='h-20 w-20 rounded-xl'
                    />
                    <div className='w-full'>
                        <CardTitle className='text-base lg:text-xl font-semibold line-clamp-1'>
                            {dish.dishes_name}
                        </CardTitle>
                        <CardDescription className='text-sm text-gray-500 line-clamp-2 '>
                            {dish.dishes_description}
                        </CardDescription>
                    </div>
                </div>
                <div className='flex items-cente justify-between'>
                    <CardDescription className='text-xl font-semibold'>
                        S/. {dish.price}
                    </CardDescription>
                    <div className='flex items-cente justify-center gap-2'>
                        <Button
                            variant={'principal'}
                            className='rounded-full py-4 px-2 h-3'>
                            <PlusIcon />
                        </Button>
                        <div className='flex items-center'>
                            <span>10</span>
                        </div>
                        <Button
                            variant={'principal'}
                            className='rounded-full py-4 px-2 h-3'>
                            <MinusIcon />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
