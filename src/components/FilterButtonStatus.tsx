import { useEffect, useState } from 'react';
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

    const handleStatusChange = (statusValue: string) => {
        setSearchParams({ status: statusValue });
    };
    return (
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
    );
}
