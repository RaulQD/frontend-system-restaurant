import { BiSearch } from 'react-icons/bi';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function FilterInput() {
    return (
        <div className='relative'>
            <Input
                type='text'
                id='search'
                placeholder='Buscar empleados'
                className='pl-10'
            />
            <Label id='search'>
                <BiSearch className='text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 text-lg' />
            </Label>
        </div>
    );
}
