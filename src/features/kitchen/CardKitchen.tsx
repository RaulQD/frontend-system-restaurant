import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OrdersList } from '@/types/order';
import { ClockIcon, ComponentInstanceIcon } from '@radix-ui/react-icons';
import { CheckCheckIcon, LucideAlarmClockCheck } from 'lucide-react';
import { CgSandClock } from 'react-icons/cg';
import { PiHandCoins } from 'react-icons/pi';

type CardKitchenProps = {
    order: OrdersList;
};

export default function CardKitchen({ order }: CardKitchenProps) {
    //OBTENER EL PRIMER NOMBRE Y APELLIDO DEL USUARIO
    const names = order.employee.names.split(' ');
    console.log(names);
    const last_name = order.employee.last_name.split(' ');
    console.log(last_name);
    const full_name = names[0] + ' ' + last_name[0];

    const statusOrder = (status: string) => {
        switch (status) {
            case 'PENDIENTE':
                return (
                    <Badge className=' bg-[#FDEEBF] hover:bg-[#FDEEBF]/80 text-black font-normal'>
                        <CgSandClock className='w-4 h-4' />
                        Pendiente
                    </Badge>
                );
            case 'EN PROCESO':
                return (
                    <Badge
                        className='bg-[#6be6ff] hover:bg-[#6be6ff]/80 text-black font-normal flex items-center gap-1'>
                        <LucideAlarmClockCheck className='w-4 h-4  ' />
                        En Proceso
                    </Badge>
                );
            case 'LISTO PARA SERVIR':
                return (
                    <Badge className='bg-[#e8edff] hover:bg-[#e8edff]/80 text-black font-normal flex items-center gap-1'>
                        <CheckCheckIcon className='w-4 h-4' />
                        Listo para Servir
                    </Badge>
                );
            case 'LISTO PARA PAGAR':
                return (
                    <Badge className='bg-[#5cf25c] hover:bg-[#5cf25c]/80 text-black font-normal flex items-center gap-1'>
                        <PiHandCoins className='w-4 h-4' />
                        Listo para Pagar
                    </Badge>
                );
            case 'COMPLETADO':
                return (
                    <Badge variant='success' className='text-black font-normal'>
                        Completado
                    </Badge>
                );
            default:
                return (
                    <Badge
                        variant='secondary'
                        className='text-black font-normal'>
                        Desconocido
                    </Badge>
                );
        }
    };

    return (
        <>
            <Card className='font-outfit w-full'>
                <CardHeader className='p-4'>
                    <div className='flex items-center justify-between'>
                        <h1 className=' text-sm font-medium'>{full_name}</h1>

                        <span>{statusOrder(order.order_status)}</span>
                    </div>
                </CardHeader>
                <CardContent className='px-4 pb-4'>
                    <Separator className='mb-4' />
                    <div>
                        <div className='flex items-center justify-start gap-2'>
                            <ClockIcon className='w-3 h-3 text-gray-500' />
                            <p className='text-sm text-gray-500'>
                                {new Date(order.created_at).toLocaleString()}
                            </p>
                        </div>
                        <div className='flex items-center justify-start gap-2'>
                            <ComponentInstanceIcon className='w-3 h-3 text-gray-500' />
                            <p className='text-sm font-normal text-gray-500'>
                                Pedido # {order.order_number} - Mesa{' '}
                                {order.table.num_table}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
