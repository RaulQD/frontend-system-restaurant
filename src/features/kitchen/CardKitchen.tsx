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
    const [elapsedTime, setElapsedTime] = useState<string>('00:00:00');
    const [timerColor,setTimerColor] = useState<string>("");
    //OBTENER EL PRIMER NOMBRE Y APELLIDO DEL USUARIO
    const names = order.employee.names.split(' ');
    const last_name = order.employee.last_name.split(' ');
    const full_name = names[0] + ' ' + last_name[0];

    useEffect(() => {
        const updateElapsedTime = (startTimeStr: string) => {
            const date = new Date();
            const readyTime = new Date(startTimeStr);
            const diff = Math.floor(
                (date.getTime() - readyTime.getTime()) / 1000
            );
            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            if(minutes < 5 ){
                setTimerColor("text-green-500")
            } else if(minutes >= 5 && minutes < 10){
                setTimerColor("text-yellow-500")
            } else if(minutes >= 10 && minutes < 15){
                setTimerColor("text-orange-500")
            } else {
                setTimerColor("text-red-500")
            }
           return `${String(hours).padStart(2, '0')}:${String(
                minutes
            ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };
        setElapsedTime(updateElapsedTime(order.start_time));
        const intervalTime = setInterval(() => {
            setElapsedTime(updateElapsedTime(order.start_time))
        },1000)
        return () => clearInterval(intervalTime);
    }, [order.start_time]);

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
                            <p className={`text-sm font-medium ${timerColor}`}>
                                {elapsedTime} min
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
