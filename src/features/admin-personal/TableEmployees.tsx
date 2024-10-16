import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useEmployees } from './useEmployees';
import { formatCurrency } from '../../utils/index';
import Spinner from '@/components/Spinner';
import { Badge } from '@/components/ui/badge';
import { BiDotsVertical } from 'react-icons/bi';
import NoImage from '@/assets/not-image-found.png';
import PaginationI from '@/components/PaginationI';

export default function TableEmployees() {
    const { employees, isLoading, error } = useEmployees();

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }

    if (!employees?.result.length) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gay-500'>{error?.message}</p>
            </div>
        );
    }
    const badgeStatus = (status: string) => {
        switch (status) {
            case 'activo':
                return (
                    <Badge variant='success' className='text-white font-bold'>
                        Activo
                    </Badge>
                );
            case 'en vacaciones':
                return (
                    <Badge variant='info' className='text-black font-bold'>
                        En Vacaciones
                    </Badge>
                );
            case 'no activo':
                return (
                    <Badge
                        variant='destructive'
                        className='text-white font-bold'>
                        No activo
                    </Badge>
                );
            case 'suspendido':
                return (
                    <Badge variant='warning' className='text-white font-bold'>
                        Suspendido
                    </Badge>
                );
            default:
                return (
                    <Badge variant='secondary' className='text-white font-bold'>
                        Desconocido
                    </Badge>
                );
        }
    };

    return (
        <>
            <div className='mt-6'>
                <div className='overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                    <Table className='w-full divide-y divide-gray-300'>
                        <TableHeader className='bg-slate-200'>
                            <TableRow>
                                <TableHead className='w-[300px]'>ID</TableHead>
                                <TableHead>Foto</TableHead>
                                <TableHead>Nombres</TableHead>
                                <TableHead>Apellidos</TableHead>
                                <TableHead>Salary</TableHead>
                                <TableHead>Fecha de Inicio</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className='text-right'>
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees?.result.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell className='font-medium'>
                                        {employee.id}
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={
                                                employee?.profile_picture_url ||
                                                NoImage
                                            }
                                            alt={employee.names}
                                            className='w-10 h-10 '
                                        />
                                    </TableCell>
                                    <TableCell>{employee.names}</TableCell>
                                    <TableCell>{employee.last_name}</TableCell>
                                    <TableCell>
                                        {formatCurrency(employee.salary)}
                                    </TableCell>
                                    <TableCell>
                                        {employee.hire_date
                                            ? new Date(
                                                  employee.hire_date
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        {badgeStatus(employee.status)}
                                    </TableCell>
                                    <TableCell>{employee.role.name}</TableCell>
                                    <TableCell className='flex items-end justify-end'>
                                        <BiDotsVertical
                                            className='text-lg cursor-pointer'
                                            onClick={() => {
                                                console.log('clicked');
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <PaginationI
                    totalItems={employees?.pagination.totalEmployees || 0}
                />
            </div>
        </>
    );
}
