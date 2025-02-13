import DatePicker from '@/components/DatePicker';
import FilterButtonStatus from '@/components/FilterButtonStatus';
import FilterInput from '@/components/FilterInput';
import { FilterSelect } from '@/components/FilterSelect';
import TableOrderHistory from '@/features/orderHistory/TableOrderHistory';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSearchParams } from 'react-router-dom';

export default function OrderHistory() {
    const statusOptions = [
        { key: 'todos', label: 'Todos', value: 'todos' },
        { key: 'completed', label: 'Pagados', value: 'pagado' },
        { key: 'cancelled', label: 'Cancelados', value: 'cancelado' },
    ];
    const isMobile = useMediaQuery('(min-width: 768px)');
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
    //FUNCIÓN PARA FILTRAR POR FECHA DE INICIO Y FECHA DE FIN
    const handleDateChange = (startDate: string) => {
        if (startDate === 'startDate') {
            searchParams.delete('startDate');
        } else {
            searchParams.set('startDate', startDate);
        }
        setSearchParams(searchParams);
    };
    const handleEndDateChange = (endDate: string) => {
        if (endDate === 'endDate') {
            searchParams.delete('endDate');
        } else {
            searchParams.set('endDate', endDate);
        }
        setSearchParams(searchParams);
    };

    return (
        <section>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <div>
                    <h1 className='font-outfit text-xl font-medium'>
                        Historial de Ordenes
                    </h1>
                    <span className='font-outfit text-gray-400 text-sm'>
                        Aquí puedes ver el historial de ordenes realizadas en tu
                        restaurante.
                    </span>
                </div>
            </div>
            <div className='mt-14 '>
                <div className='flex flex-col items-start gap-2 xl:flex-row xl:items-center xl:justify-between'>
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

                    <div className='w-full flex flex-col gap-2 md:flex-row md:items-center justify-start xl:justify-end '>
                        <FilterInput
                            filterValue='keyword'
                            placeholder='Buscar orden'
                        />

                        <div className='flex flex-col gap-2 sm:flex-row sm:items-center md:justify-between'>
                            <DatePicker
                                onDateChange={handleDateChange}
                                text='Fecha de inicio'
                            />
                            <DatePicker
                                onDateChange={handleEndDateChange}
                                text='Fecha de fin'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <TableOrderHistory />
        </section>
    );
}
