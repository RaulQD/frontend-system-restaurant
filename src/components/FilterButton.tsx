import { Button } from '@/components/ui/button';
import { getRooms } from '@/services/apiRooms';
import { Rooms } from '@/types/rooms';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

type FilterButtonProps = {
    filterValue: string;
};

export default function FilterButton({ filterValue }: FilterButtonProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentRoom = searchParams.get(filterValue) || 'comedor principal';

    const { data: rooms } = useQuery<Rooms[]>({
        queryKey: ['rooms'],
        queryFn: getRooms,
    });

    const handleButtonFilter = (room: string) => {
        console.log(`URL construida: ${window.location.href}`);
        searchParams.set(filterValue, room);
        setSearchParams(searchParams);
    };

    return (
        <div>
            <ul className='flex items-center justify-center gap-4'>
                {rooms?.map((room) => (
                    <li key={room.id}>
                        <Button
                            variant={
                                currentRoom === room.room_name
                                    ? 'principal'
                                    : 'outline'
                            }
                            className='capitalize'
                            onClick={() => handleButtonFilter(room.room_name)}>
                            {room.room_name}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
