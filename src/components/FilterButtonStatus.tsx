import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { FilterSelect } from './FilterSelect';

const statusOptions = [
    { key: 'all', label: 'Todos', value: 'todos' },
    { key: 'active', label: 'Activos', value: 'activo' },
    { key: 'vacation', label: 'En Vacaciones', value: 'en vacaciones' },
    { key: 'inactive', label: 'No Activo', value: 'no activo' },
    { key: 'suspended', label: 'Suspendido', value: 'suspendido' },
];
type FilterButtonStatusProps = {
    useSelectOnMobile?: boolean; // Agregado para controlar si se usa Select en móvil
};

export default function FilterButtonStatus({
    useSelectOnMobile = true,
}: FilterButtonStatusProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get('status')) {
            setSearchParams({ status: 'todos' });
        }
    }, [searchParams, setSearchParams]);

    //ARREGLAR BUG DE FILTRO DE STATUS YA QUE AL PONERLO EN MODO MOBILE NO FUNCIONA O MUESTRA EL FILTRO TODOS MÁS NO EL QUE SELECCIONE 
    const handleStatusChange = (statusValue: string) => {
        if (statusValue === 'all') {
            searchParams.delete('status');
        } else {
            searchParams.set('status', statusValue);
        }
        setSearchParams(searchParams);
    };
    return (
        <>
            {useSelectOnMobile && (
                <div className=' xl:hidden'>
                    <FilterSelect
                        items={statusOptions}
                        currentFilterValue={searchParams.get('status') || 'all'}
                        showAllButton={true}
                        getLabel={(item) => item.label}
                        getValue={(item) => item.value}
                        onValueChange={(value) => handleStatusChange(value)}
                    />
                </div>
            )}
            <div className={useSelectOnMobile ? 'hidden xl:block' : 'block'}>
                <div className='flex items-center justify-start gap-2'>
                    {statusOptions.map((status) => (
                        <Button
                            key={status.key}
                            onClick={() => handleStatusChange(status.value)}
                            variant={
                                searchParams.get('status') === status.value
                                    ? 'principal'
                                    : 'outline'
                            }>
                            {status.label}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    );
}
