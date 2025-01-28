import TableList from '@/features/manage-table/TableList';
import FilterButton from '@/components/FilterButton';
import { Rooms } from '@/types/rooms';
import { getRooms } from '@/services/apiRooms';

export default function ManageTable() {
    return (
        <section>
            <div>
                <div className='flex flex-col md:flex-row items-start justify-between gap-6'>
                    <div>
                        <h1 className='font-outfit text-xl font-medium'>
                            Gestionar Mesas
                        </h1>
                        <div className='flex items-center justify-start gap-4 mt-2'>
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
