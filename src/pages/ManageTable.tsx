import { Button } from '@/components/ui/button';
import CardTable from '@/features/manage-table/components/CardTable';

export default function ManageTable() {
    const tables = [
        { tableNumber: 1, clients: 2, maxClients: 4 },
        { tableNumber: 2, clients: 4, maxClients: 4 },
        { tableNumber: 3, clients: 1, maxClients: 2 },
        { tableNumber: 4, clients: 0, maxClients: 6 },
    ];
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
                    <div className='flex items-center justify-center gap-4'>
                        <Button variant={'principal'}>Comedor Principal</Button>
                        <Button variant={'outline'}>Exterior</Button>
                        <Button variant={'outline'}>Terraza</Button>
                    </div>
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
