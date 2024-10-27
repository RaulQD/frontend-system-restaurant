import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ClockIcon, ComponentInstanceIcon } from '@radix-ui/react-icons';

export default function CardKitchen() {
    return (
        <Card className='font-outfit'>
            <CardHeader className='p-4'>
                <div className='flex items-center justify-between'>
                    <h1 className=' text-sm font-medium'>Gabriela guerra</h1>
                    <Badge variant='default'>Pendiente</Badge>
                </div>
            </CardHeader>
            <CardContent className='px-4 pb-4'>
                <Separator className='mb-4' />
                <div>
                    <div className='flex items-center justify-start gap-2'>
                        <ClockIcon className='w-3 h-3 text-gray-500' />
                        <p className='text-sm text-gray-500'>
                            12:30pm, 8 de agosto, 2024
                        </p>
                    </div>
                    <div className='flex items-center justify-start gap-2'>
                        <ComponentInstanceIcon className='w-3 h-3 text-gray-500' />

                        <p className='text-sm font-normal text-gray-500'>
                            Pedido #123 - Mesa 2
                        </p>
                    </div>
                </div>
                <Separator className='my-4' />
                <div className='flex justify-between text-sm'>
                    <span className='font-medium'>4 items</span>
                    <span className='text-teal-600 font-medium'>
                        S/. 150.00
                    </span>
                </div>
                <div>
                    <ul className='flex flex-col justify-between text-sm'>
                        <li className='flex items-center justify-between gap-2 '>
                            <p className='font-normal text-gray-500'>
                                Lomo saltado
                            </p>
                            <span className='font-medium text-black'>
                                S/. 26.90
                            </span>
                        </li>
                        <li className='flex items-center justify-between gap-2 '>
                            <p className='font-normal text-gray-500'>
                                Ceviche mixto
                            </p>
                            <span className='font-medium text-black'>
                                S/. 38.90
                            </span>
                        </li>
                        <li className='flex items-center justify-between gap-2 '>
                            <p className='font-normal text-gray-500'>
                                S/. Inca kola 3L
                            </p>
                            <span className='font-medium text-black '>
                                S/. 5.50
                            </span>
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
