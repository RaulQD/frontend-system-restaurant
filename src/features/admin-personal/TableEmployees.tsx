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

export default function TableEmployees() {
    const { employees, isLoading, error } = useEmployees();

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }

    if (employees?.result.length === 0) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-2xl font-semibold text-gray-500'>
                    No se encontraron empleados
                </p>
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
        <div className='rounded-md border mt-6'>
            <div className='overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <Table className='w-full divide-y divide-gray-300'>
                    <TableHeader className='bg-slate-200'>
                        <TableRow>
                            <TableHead className='w-[300px]'>ID</TableHead>
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
        </div>
    );
}
