import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { Category } from '@/types/category';

type CardCategoryProps = {
    category: Category;
};

export default function CardCategory({ category }: CardCategoryProps) {
    return (
        <Card className='max-w-full hover:bg-teal-600 hover:text-white'>
            <CardContent className='p-4 w-[180px]'>
                <div className=''>
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
