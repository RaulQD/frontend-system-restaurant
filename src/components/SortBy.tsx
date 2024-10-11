import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
export default function SortBy() {
    return (
        <div className=''>
            <Select>
                <SelectTrigger className='w-[150px]'>
                    <SelectValue placeholder='Filtros' />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Rangos</SelectLabel>
                        <SelectItem value='1'>Hoy</SelectItem>
                        <SelectItem value='2'>Ayer</SelectItem>
                        <SelectItem value='3'>Esta semana</SelectItem>
                        <SelectItem value='4'>Este mes</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
