import FilterButtonStatus from '@/components/FilterButtonStatus';
import FilterInput from '@/components/FilterInput';
import SortBy from '@/components/SortBy';
import { Button } from '@/components/ui/button';

import TableEmployees from '@/features/admin-personal/TableEmployees';
// import { useState } from 'react';

import { BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
    const navigate = useNavigate();
    const statusOptions = [
        { key: 'all', label: 'Todos', value: 'todos' },
        { key: 'active', label: 'Activos', value: 'activo' },
        { key: 'vacation', label: 'En Vacaciones', value: 'en vacaciones' },
        { key: 'inactive', label: 'No Activo', value: 'no activo' },
        { key: 'suspended', label: 'Suspendido', value: 'suspendido' },
    ];

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
                        navigate('/dashboard/empleados/registrar-empleado')
                    }>
                    <BiPlus className='mr-1 text-xl text-white' />
                    Agregar empleados
                </Button>
            </div>
            <div className='mt-14'>
                <div className='flex flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-between'>
                    <FilterButtonStatus statusOptions={statusOptions}/>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-end gap-2'>
                        <FilterInput filterValue='keyword' placeholder='Buscar empleado'/>
                        <SortBy />
                    </div>
                </div>
            </div>
            <TableEmployees />
        </section>
    );
}
