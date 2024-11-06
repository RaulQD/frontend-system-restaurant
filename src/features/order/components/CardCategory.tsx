import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import Ensalada from '@/assets/ensalada.png';
import { Category } from '@/types/category';

type CardCategoryProps = {
    category: Category;
};

export default function CardCategory({ category }: CardCategoryProps) {
    return (
        <Card className='max-w-full hover:bg-teal-600 hover:text-white'>
            <CardContent className='p-4 w-[180px]'>
                <div className=''>
                    {/* <img
                        src={Ensalada}
                        alt=''
                        className='h-8 w-8 object-cover flex items-center justify-center'
                    /> */}
                    <div>
                        <CardTitle className='font-medium font-outfit'>
                            {category.category_name}
                        </CardTitle>
                        <CardDescription className='font-normal text-sm font-outfit '>
                            13 platos
                        </CardDescription>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
