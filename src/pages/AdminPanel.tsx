import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import TableEmployees from '@/features/admin-personal/TableEmployees';

import { BiPlus, BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
    const navigate = useNavigate();

    return (
        <section className=''>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <div>
                    <h1 className='font-outfit text-xl font-medium'>
                        Gestionar empleados
                    </h1>
                    <span className='font-outfit text-gray-400 text-sm'>
                        Aquí puedes gestionar a los empleados de tu restaurante.
                    </span>
                </div>
                <Button
                    variant={'principal'}
                    onClick={() =>
                        navigate('/admin/dashboard/personal-register')
                    }>
                    <BiPlus className='mr-1 text-xl text-white' />
                    Agregar empleados
                </Button>
            </div>
            <div className='mt-14'>
                <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'>
                    <div className='flex items-center justify-start gap-2'>
                        <Button variant={'principal'}>Activos</Button>
                        <Button variant={'outline'}>En vacaciones</Button>
                        <Button variant={'outline'}>Suspendido</Button>
                    </div>
                    <div className='flex items-center justify-end gap-2'>
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
                                        <SelectItem value='3'>
                                            Esta semana
                                        </SelectItem>
                                        <SelectItem value='4'>
                                            Este mes
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <TableEmployees />
        </section>
    );
}
