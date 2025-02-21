import * as React from 'react';
import {
    format,
    getYear,
    isAfter,
    setMonth,
    setYear,
    startOfDay,
} from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

type DatePickerProps = {
    text: string;
    startYear?: number;
    endYear?: number;
    onDateChange: (startDate: string) => void;
};

export default function DatePicker({
    text,
    onDateChange,
    startYear = getYear(new Date()) - 100,
    endYear = getYear(new Date()) + 100,
}: DatePickerProps) {
    const [date, setDate] = React.useState<Date>(new Date());
    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];
    const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
    );
    //OBTENER LA FECHA ACTUAL SIN HORAS
    const today = startOfDay(new Date());
    const handleMonthChange = (month: string) => {
        const newDate = setMonth(date, months.indexOf(month));
        setDate(newDate);
    };
    const handleYearChange = (year: string) => {
        const newDate = setYear(date, parseInt(year));
        setDate(newDate);
    };
    const handleSelect = (selectedDate: Date | undefined) => {
        //SI LA FECHA SELECCIONADA ES MENOR A LA FECHA ACTUAL, SE GUARDA
        if (selectedDate && !isAfter(selectedDate, today)) {
            setDate(selectedDate);
            onDateChange(format(selectedDate, 'yyyy-MM-dd'));
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-auto sm:w-full md:w-[246px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                    )}>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {date ? format(date, 'yyyy-MM-dd') : <span>{text}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <div className='flex justify-between p-2'>
                    <Select
                        onValueChange={handleMonthChange}
                        value={months[date.getMonth()]}>
                        <SelectTrigger className='w-[110px]'>
                            <SelectValue placeholder='Mes' />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={handleYearChange}
                        value={getYear(date).toString()}>
                        <SelectTrigger className='w-[110px]'>
                            <SelectValue placeholder='Año' />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((item) => (
                                <SelectItem key={item} value={item.toString()}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    month={date}
                    onMonthChange={setDate}
                    disabled={(date) => isAfter(date, today)}//DESACTIVAR FECHAS FUTURAS
                />
            </PopoverContent>
        </Popover>
    );
}
