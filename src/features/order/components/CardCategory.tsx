import { Card, CardContent } from '@/components/ui/card';
import Ensalada from '@/assets/ensalada.png';

export default function CardCategory() {
    const categories = [
        {
            id: 1,
            name: 'Ensaladas',
            image:'../../../assets/ensalada.png',
        },
        {
            id: 2,
            name: 'Platos fuertes',
            image:'../../../assets/bandeja.png',
        }
    ];


    return (
        <Card>
            <CardContent className='p-4'>
                <div className='flex items-center justify-center'>
                    <div>
                        <img src={Ensalada} alt='' className='h-10 w-10' />
                    </div>
                    <div>
                        <h3 className='font-medium font-outfit'>Nombre de la categoría</h3>
                        <p className='font-normal text-sm font-outfit text-gray-400'>13 platos</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
