import FilterButton from '@/components/FilterButton';
import CardTable from '@/features/manage-table/components/CardTable';

export default function ManageTable() {
    return (
        <section>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-outfit text-xl font-medium'>
                            Gestionar Mesas
                        </h1>
                    </div>
                    {/* Rooms tables */}
                    <FilterButton />
                </div>
                <div className='flex items-center justify-start gap-4 mt-2'>
                    <div className='flex items-center justify-center gap-3'>
                        <span className='bg-blue-300 w-2 h-2 py-1 px-1 block rounded-full'></span>
                        <p className='text-sm font-outfit font-medium'>
                            Disponibles
                        </p>
                    </div>
                    <div className='flex items-center justify-center gap-3'>
                        <span className='bg-red-600 w-2 h-2 py-1 px-1 block rounded-full'></span>
                        <p className='text-sm font-outfit font-medium'>
                            Ocupados
                        </p>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    <CardTable />
                    <CardTable />
                    <CardTable />
                    <CardTable />
                    <CardTable />
                    <CardTable />
                    <CardTable />
                    <CardTable />
                    <CardTable />
                    <CardTable />
                    <CardTable />
                </div>
            </div>
        </section>
    );
}
