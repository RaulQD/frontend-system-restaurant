import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import Ensalada from '@/assets/ensalada.png';

export default function CardCategory() {
    return (
        <Card>
            <CardContent className='p-4'>
                <div className='flex items-center justify-start gap-4'>
                    <img
                        src={Ensalada}
                        alt=''
                        className='h-8 w-8 object-cover flex items-center justify-center'
                    />
                    <div>
                        <CardTitle className='font-medium font-outfit'>
                            Plato principal
                        </CardTitle>
                        <CardDescription className='font-normal text-sm font-outfit text-gray-400'>
                            13 platos
                        </CardDescription>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
