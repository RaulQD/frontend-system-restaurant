import FilterButtonStatus from '@/components/FilterButtonStatus';
import FilterInput from '@/components/FilterInput';
import TableOrderHistory from '@/features/orderHistory/TableOrderHistory';

export default function OrderHistory() {
    const statusOptions = [
        { key: 'all', label: 'Todos', value: 'todos' },
        { key: 'completed', label: 'Completados', value: 'completado' },
        { key: 'cancelled', label: 'Cancelados', value: 'cancelado' },
    ];

    return (
        <>
            <section>
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                    <div>
                        <h1 className='font-outfit text-xl font-medium'>
                            Historial de Ordenes
                        </h1>
                        <span className='font-outfit text-gray-400 text-sm'>
                            Aquí puedes ver el historial de ordenes realizadas
                            en tu restaurante.
                        </span>
                    </div>
                </div>
                <div className='mt-14 '>
                    <div className='flex flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-between'>
                        <FilterButtonStatus statusOptions={statusOptions}/>
                        <FilterInput
                            filterValue='keyword'
                            placeholder='Buscar orden'
                        />
                    </div>
                </div>
                <TableOrderHistory />
            </section>
        </>
    );
}
