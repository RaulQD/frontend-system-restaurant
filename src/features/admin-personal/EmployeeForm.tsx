import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useState } from 'react';

export default function EmployeeForm() {
    const [date, setDate] = useState<Date>();
    return (
        <div>
            <div className=''>
                <div className=''>
                    <h1 className='font-outfit text-xl font-medium'>
                        Información del Empleado
                    </h1>
                </div>
                <Separator className='my-4' />
                <form>
                    <div className='font-outfit mb-4'>
                        <h2 className=' text-lg text-slate-600 font-normal'>
                            Datos Personales
                        </h2>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mt-5'>
                            <div className=''>
                                <Label
                                    id='first_name'
                                    htmlFor='first_name'
                                    className='text-slate-500 font-normal'>
                                    Primer nombre
                                </Label>
                                <Input
                                    type='text'
                                    id='first_name'
                                    name='first_name'
                                    placeholder='Primer Nombre'
                                    className='mt-2 '
                                />
                            </div>
                            <div>
                                <Label
                                    id='middle_name'
                                    htmlFor='middle_name'
                                    className='text-slate-500 font-normal'>
                                    Segundo Nombre{' '}
                                    <span className='font-semibold'>
                                        (opcional)
                                    </span>
                                </Label>
                                <Input
                                    type='text'
                                    id='middle_name'
                                    placeholder='Segundo Nombre'
                                    className='mt-2'
                                />
                            </div>
                            <div>
                                <Label
                                    id='last_name'
                                    htmlFor='last_name'
                                    className='text-slate-500 font-normal'>
                                    Apellidos
                                </Label>
                                <Input
                                    type='text'
                                    id='last_name'
                                    placeholder='Apellidos'
                                    className='mt-2'
                                />
                            </div>
                            <div>
                                <Label
                                    id='dni'
                                    htmlFor='dni'
                                    className='text-slate-500 font-normal'>
                                    N° de documento
                                </Label>
                                <Input
                                    type='text'
                                    id='dni'
                                    placeholder='ej. 00000000'
                                    className='mt-2'
                                />
                            </div>
                            <div>
                                <Label
                                    id='email'
                                    htmlFor='email'
                                    className='text-slate-500 font-normal'>
                                    Correo electrónico
                                </Label>
                                <Input
                                    type='email'
                                    id='email'
                                    placeholder='ejemplo@ejemplo.com'
                                    className='mt-2'
                                />
                            </div>
                            <div>
                                <Label
                                    id='phone'
                                    htmlFor='phone'
                                    className='text-slate-500 font-normal'>
                                    Contacto
                                </Label>
                                <Input
                                    type='text'
                                    id='phone'
                                    placeholder='ej. 999999999'
                                    className='mt-2'
                                />
                            </div>
                            <div>
                                <Label
                                    id='address'
                                    htmlFor='address'
                                    className='text-slate-500 font-normal'>
                                    Dirección
                                </Label>
                                <Input
                                    type='text'
                                    id='address'
                                    placeholder='dirección'
                                    className='mt-2'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='font-outfit border border-gray-300 p-4 mb-4'>
                        <h2 className=' text-lg text-slate-600 font-normal'>
                            Detalle de trabajo
                        </h2>
                        <div className='grid grid-cols-1 lg:grid-cols-3'>
                            <div>
                                <Label
                                    id='salary'
                                    htmlFor='salary'
                                    className='text-slate-500 font-normal'>
                                    Contacto
                                </Label>
                                <Input
                                    type='text'
                                    id='salary'
                                    placeholder='ej. 999999999'
                                    className='mt-2'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label
                                    id='hire_date'
                                    htmlFor='hire_date'
                                    className='text-slate-500 font-normal'>
                                    Fecha de contratación
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[240px] justify-start text-left font-normal',
                                                !date && 'text-muted-foreground'
                                            )}>
                                            {date ? (
                                                format(date, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='w-auto p-0'
                                        align='start'>
                                        <Calendar
                                            mode='single'
                                            selected={date}
                                            onSelect={setDate}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
