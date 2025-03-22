import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OrdersList } from '@/types/order';
import {
    ClockIcon,
    ComponentInstanceIcon,
    TimerIcon,
} from '@radix-ui/react-icons';
import { CheckCheckIcon, LucideAlarmClockCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CgSandClock } from 'react-icons/cg';
import { PiHandCoins } from 'react-icons/pi';

type CardKitchenProps = {
    order: OrdersList;
};

export default function CardKitchen({ order }: CardKitchenProps) {
    const [minutesElapsed, setMinutesElapsed] = useState<string>("00:00:00");

    useEffect(() => {
        const calculateMinutesElapsed = () => {
            //OBETENER LA FECHA ACTUAL
            const now = new Date();
            //OBTENER LA FECHA DE CREACIÓN DE LA ORDEN
            const date = new Date(order.created_at);
            //CALCULAR LOS MINUTOS TRANSCURRIDOS
            const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
            //CALCULAR LAS HORAS,MINUTOS Y SEGUNDOS
            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff & 3600) / 60);
            const seconds = diff % 60;
            //FORMATEAR LOS MINUTOS TRANSCURRIDOS
            const elapsed = `${String(hours).padStart(2, '0')}:${String(
                minutes
            ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            //ACTUALIZAR EL ESTADO DE LOS MINUTOS TRANSCURRIDOS
            setMinutesElapsed(elapsed);
        };
        //EJECUTAR LA FUNCIÓN PARA CALCULAR LOS MINUTOS TRANSCURRIDOS
        calculateMinutesElapsed();
        //ACTUALIZAR LOS MINUTOS TRANSCURRIDOS CADA SEGUNDO
        const interval = setInterval(calculateMinutesElapsed, 1000);
        //LIMPIAR EL INTERVALO
        return () => clearInterval(interval);
    }, [order.created_at]);

    //OBTENER EL PRIMER NOMBRE Y APELLIDO DEL USUARIO
    const names = order.employee.names.split(' ');
    const last_name = order.employee.last_name.split(' ');
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
                    <Badge className='bg-[#6be6ff] hover:bg-[#6be6ff]/80 text-black font-normal flex items-center gap-1'>
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
    //FORMATEAR LA FECHA DE CREACIÓN DE LA ORDEN
    const formatDateTime = (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString('es-PE', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <>
            <Card className='font-outfit w-full'>
                <CardHeader className='p-4'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-sm font-medium'>{full_name}</h1>
                        <span>{statusOrder(order.order_status)}</span>
                    </div>
                </CardHeader>
                <CardContent className='px-4 pb-4'>
                    <Separator className='mb-4' />
                    <div>
                        {/* Fecha de creación */}
                        <div className='flex items-center gap-2'>
                            <ClockIcon className='w-3 h-3 text-gray-500' />
                            <p className='text-sm text-gray-500 capitalize'>
                                {formatDateTime(order.created_at)}
                            </p>
                        </div>
                        {/* Minutos transcurridos */}
                        <div className='flex items-center gap-2'>
                            <TimerIcon className='w-3 h-3 text-red-500' />
                            <p className='text-sm text-red-500 font-medium'>
                                {minutesElapsed} min
                            </p>
                        </div>
                        {/* Número de pedido y mesa */}
                        <div className='flex items-center gap-2'>
                            <ComponentInstanceIcon className='w-3 h-3 text-gray-500' />
                            <p className='text-sm font-normal text-gray-500'>
                                Pedido # {order.order_number} -{' '}
                                {order.table.num_table}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
