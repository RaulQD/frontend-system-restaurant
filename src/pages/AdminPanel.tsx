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
    // const [isOpen, setIsOpen] = useState(false);
    // const handleOpenModal = () => {
    //     setIsOpen(true);
    // };

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
                <div className='flex flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-between'>
                    <FilterButtonStatus />
                    <div className='flex flex-col md:flex-row md:items-center md:justify-end gap-2'>
                        <FilterInput filterValue='keyword' />
                        <SortBy />
                    </div>
                </div>
            </div>
            <TableEmployees />
        </section>
    );
}
