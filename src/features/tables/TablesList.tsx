import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useTable } from './useTable';
import { useNavigate } from 'react-router-dom';
import PaginationI from '@/components/PaginationI';
import Spinner from '@/components/Spinner';
import DropdownActions from '@/components/DropdownActions';
import EditTableData from './EditTableData';
import { BiPencil, BiTrash } from 'react-icons/bi';

export default function TablesList() {
    const navigate = useNavigate();
    const { tables, isLoading, isError, error } = useTable();

    
    if (tables?.results.length === 0) {
        return (
            <div className='flex items-center justify-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-96'>
                <Spinner />
            </div>
        );
    }
    if (isError) {
        return (
            <div className='flex items-center justify-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message}</p>
            </div>
        );
    }

    return (
        <div className='mt-6'>
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
                            <TableHead className='w-[200px] text-center'>
                                Salón
                            </TableHead>
                            <TableHead className='text-center'>
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tables?.results.map((table) => (
                            <TableRow key={table.id_table}>
                                <TableCell className='font-medium pl-4'>
                                    {table.id_table}
                                </TableCell>
                                <TableCell className='text-center'>
                                    {table.num_table}
                                </TableCell>
                                <TableCell className='text-center'>
                                    {table.capacity_table}
                                </TableCell>
                                <TableCell className='text-center capitalize'>
                                    {table.room.room_name}
                                </TableCell>
                                <TableCell className='flex items-center justify-center'>
                                    <DropdownActions
                                        actions={[
                                            {
                                                label: 'Editar',
                                                onClick: () =>
                                                    navigate(
                                                        location.pathname +
                                                            `?editTable=${table.id_table}`
                                                    ),
                                                iconType: BiPencil,
                                            },
                                            {
                                                label: 'Eliminar',
                                                onClick: () =>
                                                    console.log('Eliminar'),
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
            <PaginationI totalItems={tables?.pagination.totalTables || 0} />
            <EditTableData />
        </div>
    );
}
