import FilterButton from '@/components/FilterButton';
import Spinner from '@/components/Spinner';
import CardTable from '@/features/manage-table/components/CardTable';
import { useTables } from '@/features/manage-table/useTables';
import { getRooms } from '@/services/apiRooms';
import { Rooms } from '@/types/rooms';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ManageTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const room = searchParams.get('room') || 'comedor principal';
    const { tables, isLoading, error } = useTables(room);
    console.log(isLoading);
    console.log(error);
    console.table(tables);
    useEffect(() => {
        if (!searchParams.has('room')) {
            searchParams.set('room', 'comedor principal');
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams]);

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
                    <FilterButton<Rooms>
                        filterValue='room'
                        queryKey={['room']}
                        queryFn={getRooms}
                        getValue={(room) => room.room_name}
                        getLabel={(room) => room.room_name}
                    />
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
                {isLoading ? (
                    <div className='flex justify-center items-center pt-40'>
                        <Spinner />
                    </div>
                ) : (
                    <>
                        {!tables ? (
                            <div className='flex justify-center items-center pt-20'>
                                <p className='text-lg'>{error?.message}</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                {tables?.map((table) => (
                                    <CardTable
                                        key={table.id_table}
                                        table={table}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
