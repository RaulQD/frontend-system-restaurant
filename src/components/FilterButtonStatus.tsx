import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';

type StatusOptionProps = {
    statusOptions: {
        key: string;
        label: string;
        value: string;
    }[];
};

export default function FilterButtonStatus({ statusOptions }: StatusOptionProps) {
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
