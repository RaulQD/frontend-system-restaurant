import { Button } from '@/components/ui/button';
import { getRooms } from '@/services/apiRooms';
import { Rooms } from '@/types/rooms';
import { useQuery } from '@tanstack/react-query';

export default function FilterButton() {
    const {
        data: rooms,
        isLoading,
        isError,
    } = useQuery<Rooms[]>({
        queryKey: ['rooms'],
        queryFn: getRooms,
    });

    console.table(rooms);
    console.log(isLoading);
    console.log(isError);
    return (
        <div>
            <ul className='flex items-center justify-center gap-4'>
                {rooms?.map((room) => (
                    <li key={room.id}>
                        <Button variant={'outline'}>{room.room_name}</Button>
                    </li>
                ))}
            </ul>
            {/* <Button variant={'principal'}>Comedor Principal</Button>
            <Button variant={'outline'}>Exterior</Button>
            <Button variant={'outline'}>Terraza</Button> */}
        </div>
    );
}
