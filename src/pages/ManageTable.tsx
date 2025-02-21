import TableList from '@/features/manage-table/TableList';
import FilterButton from '@/components/FilterButton';
import { Rooms } from '@/types/rooms';
import { getRooms } from '@/services/apiRooms';

export default function ManageTable() {
    // OBTENER LA FECHA ACTUAL DEL SISTEMA
    const getCurrentDate = () => {
        const date = new Date();
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long', // "enero", "febrero", etc.
            day: 'numeric',
        });
    };
  
    return (
        <section>
            <div>
                <div className='flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-6'>
                    <div>
                        <div>
                            <h1 className='font-outfit text-2xl font-medium'>
                                Gestionar Mesas
                            </h1>
                            <span className='font-outfit text-gray-400 text-sm'>
                                {getCurrentDate()}
                            </span>
                        </div>
                        <div className='flex items-center justify-start gap-4 mt-4'>
                            <div className='flex items-center justify-center gap-3'>
                                <span className='bg-blue-300 w-2 h-2 py-1 px-1 block rounded-full'></span>
                                <p className='text-sm font-outfit font-medium'>
                                    Disponibles
                                </p>
                            </div>
                            <div className='flex items-center justify-center gap-3'>
                                <span className='bg-red-300 w-2 h-2 py-1 px-1 block rounded-full'></span>
                                <p className='text-sm font-outfit font-medium'>
                                    Ocupados
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Rooms tables */}
                    <FilterButton<Rooms>
                        filterValue='room'
                        queryKey={['room']}
                        queryFn={getRooms}
                        getValue={(room) => room.room_name}
                        getLabel={(room) => room.room_name}
                        useSelectOnMobile={false}
                    />
                </div>
                <div className='mt-10'>
                    <TableList />
                </div>
            </div>
        </section>
    );
}
