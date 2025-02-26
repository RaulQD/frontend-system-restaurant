import DropdownActions from '@/components/DropdownActions';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { useRooms } from './useRooms';
import { BiPencil, BiTrash } from 'react-icons/bi';
import AddRoomData from './AddRoomData';
import EditRoomData from './EditRoomData';
import AlertMessageDialog from '@/components/AlertMessageDialog';
import { useState } from 'react';
import { useDeleteRoom } from './useDeleteRoom';
import { Rooms } from '@/types/rooms';
import Spinner from '@/components/Spinner';

export default function TableRoom() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [roomId, setRoomId] = useState<number>();
    const { rooms, isLoading, isError, error } = useRooms();
    const { roomDelete } = useDeleteRoom();

    const handleDeleteRoom = async (roomId: Rooms['id']) => {
        roomDelete(roomId);
        setIsOpen(false);
    };
    if (rooms?.length === 0) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message}</p>
            </div>
        );
    }
    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }
    if (isError) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message}</p>
            </div>
        );
    }

    return (
        <>
            <div className='overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <Table className='w-full divide-y divide-gray-300'>
                    <TableHeader className='bg-slate-200'>
                        <TableRow>
                            <TableHead className='w-[100px] pl-4'>ID</TableHead>
                            <TableHead className=' text-center'>
                                Número de mesa
                            </TableHead>
                            <TableHead className=' text-center'>
                                Cantidad de personas
                            </TableHead>

                            <TableHead className='text-center'>
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rooms?.map((room) => (
                            <TableRow key={room.id}>
                                <TableCell className='font-medium pl-4'>
                                    {room.id}
                                </TableCell>
                                <TableCell className='text-center'>
                                    {room.room_name}
                                </TableCell>
                                <TableCell className='text-center'>
                                    {room.num_tables}
                                </TableCell>

                                <TableCell className='flex items-center justify-center'>
                                    <DropdownActions
                                        actions={[
                                            {
                                                label: 'Editar',
                                                onClick: () =>
                                                    navigate(
                                                        location.pathname +
                                                            `?editRoom=${room.id}`
                                                    ),
                                                iconType: BiPencil,
                                            },
                                            {
                                                label: 'Eliminar',
                                                onClick: () => {
                                                    setIsOpen(true);
                                                    setRoomId(room.id);
                                                },
                                                iconType: BiTrash,
                                                className: 'text-red-500 ',
                                            },
                                        ]}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <AddRoomData />
            <EditRoomData />
            <AlertMessageDialog
                title='Eliminar Sala'
                description='¿Estás seguro de eliminar la sala seleccionada?'
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onConfirm={() => handleDeleteRoom(roomId!)}
            />
        </>
    );
}
