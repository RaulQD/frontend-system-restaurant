import { BiSearch } from 'react-icons/bi';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useSearchParams } from 'react-router-dom';

export default function FilterInput({ filterValue }: { filterValue: string }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(filterValue) || '';

    const handleInputSearch = (value: string) => {
        if (value.trim() === '') {
            searchParams.delete(filterValue);
            setSearchParams(searchParams);
            return;
        } else {
            searchParams.set(filterValue, value);
            setSearchParams(searchParams);
        }
    };

    return (
        <div className='relative'>
            <Input
                type='text'
                id='search'
                placeholder='Buscar empleados'
                className='pl-10 bg-white'
                value={currentFilter}
                onChange={(e) => handleInputSearch(e.target.value)}
            />
            <Label id='search'>
                <BiSearch className='text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 text-lg' />
            </Label>
        </div>
    );
}
