import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';

const sortByOptions = [
    { key: 'today', label: 'Hoy', value: 'today' },
    { key: 'yesterday', label: 'Ayer', value: 'yesterday' },
    { key: 'thisWeek', label: 'Esta semana', value: 'thisWeek' },
    { key: 'thisMonth', label: 'Este mes', value: 'thisMonth' },
];

export default function SortBy() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get('sortBy') || '';

    const handleSortBy = (value: string ) =>{
        if (value.trim() === '') {
            searchParams.delete('sortBy');
            setSearchParams(searchParams);
            return;
        } else {
            searchParams.set('sortBy', value);
            setSearchParams(searchParams);
        }
    }

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
