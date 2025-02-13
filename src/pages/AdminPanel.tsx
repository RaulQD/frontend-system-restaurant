import FilterButtonStatus from '@/components/FilterButtonStatus';
import FilterInput from '@/components/FilterInput';
import { FilterSelect } from '@/components/FilterSelect';
import { Button } from '@/components/ui/button';

import TableEmployees from '@/features/admin-personal/TableEmployees';
import { useMediaQuery } from '@/hooks/use-media-query';

import { BiPlus } from 'react-icons/bi';
import { useNavigate, useSearchParams } from 'react-router-dom';

const statusOptions = [
    { key: 'all', label: 'Todos', value: 'todos' },
    { key: 'active', label: 'Activos', value: 'activo' },
    { key: 'vacation', label: 'En Vacaciones', value: 'en vacaciones' },
    { key: 'inactive', label: 'No Activo', value: 'no activo' },
    { key: 'suspended', label: 'Suspendido', value: 'suspendido' },
];
export default function AdminPanel() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(min-width: 768px)");
    const [searchParams, setSearchParams] = useSearchParams();

    const currentStatus = searchParams.get('status') || 'todos';

    const handleFilterChange = (value: string) => {
        if (value === 'todos') {
            searchParams.delete('status');
        } else {
            searchParams.set('status', value);
        }
        setSearchParams(searchParams);
    };

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
                <div className='mt-14 '>
                    <div className='flex flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-between'>
                        {isMobile ? (
                            <FilterButtonStatus statusOptions={statusOptions} />
                        ) : (
                            <FilterSelect
                                items={statusOptions}
                                currentFilterValue={currentStatus}
                                showAllButton={true}
                                getLabel={(item) => item.label}
                                getValue={(item) => item.value}
                                onValueChange={handleFilterChange}
                            />
                        )}
                        <FilterInput
                            filterValue='keyword'
                            placeholder='Buscar orden'
                        />
                    </div>
                </div>
            </div>
            <TableEmployees />
        </section>
    );
}
