import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';

const statusOptions = [
    { key: 'all', label: 'Todos', value: 'todos' },
    { key: 'active', label: 'Activos', value: 'activo' },
    { key: 'vacation', label: 'En Vacaciones', value: 'en vacaciones' },
    { key: 'inactive', label: 'No Activo', value: 'no activo' },
    { key: 'suspended', label: 'Suspendido', value: 'suspendido' },
];

export default function FilterButtonStatus() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get('status')) {
            setSearchParams({ status: 'todos' });
        }
    }, [searchParams, setSearchParams]);

    //ACTUALIZAR EL FILTRO DE STATUS CUANDO SE CAMBIE EL ESTADO LOCAL
    const handleStatusChange = (statusValue: string) => {
        // setCurrentStatus(statusValue);
        if (statusValue === 'todos') {
            searchParams.delete('status');
        } else {
            searchParams.set('status', statusValue);
        }
        setSearchParams(searchParams);
    };
    return (
        <>
            <div className='flex flex-wrap md:items-center justify-start gap-2'>
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
        </>
    );
}
