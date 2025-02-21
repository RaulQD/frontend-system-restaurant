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
import NoImage from '@/assets/not-image-found.png';
import PaginationI from '@/components/PaginationI';
import { useNavigate } from 'react-router-dom';
import AlertMessageDialog from '@/components/AlertMessageDialog';
import { useState } from 'react';
import { Employee } from '@/types/employee';
import { useDelete } from './useDelete';
import DropdownActions from '@/components/DropdownActions';
import { BiPencil, BiTrash } from 'react-icons/bi';

export default function TableEmployees() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeid] = useState<number | null>(
        null
    );
    const { employees, isLoading, error } = useEmployees();
    const { employeeDelete } = useDelete();

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
    const handleDeleteClick = (employeeId: Employee['id']) => {
        setSelectedEmployeeid(employeeId);
        setIsOpen(true);
    };
    const handleDeleteEmployee = () => {
        if (selectedEmployeeId) {
            employeeDelete(selectedEmployeeId);
            setIsOpen(false);
        }
    };

    return (
        <>
            <div className='mt-6'>
                <div className='overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                    <Table className='w-full divide-y divide-gray-300'>
                        <TableHeader className='bg-slate-200'>
                            <TableRow>
                                <TableHead className='w-[150px] pl-4'>
                                    ID
                                </TableHead>
                                <TableHead>Foto</TableHead>
                                <TableHead>Nombres</TableHead>
                                <TableHead>Apellidos</TableHead>
                                <TableHead>Salary</TableHead>
                                <TableHead>Fecha de Inicio</TableHead>
                                <TableHead>Puesto</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className='text-center'>
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees?.result.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell className='font-medium pl-4'>
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
                                    <TableCell className='capitalize'>
                                        {employee.role.role_name}
                                    </TableCell>
                                    <TableCell>
                                        {badgeStatus(employee.status)}
                                    </TableCell>
                                    <TableCell className='text-center'>
                                              <DropdownActions 
                                              actions = {[
                                                {
                                                    label: 'Editar',
                                                    onClick: () =>
                                                        navigate(
                                                            location.pathname +
                                                                `/${employee.id}/edit`
                                                        ),
                                                    iconType: BiPencil
                                                },
                                                {
                                                    label: 'Ver',
                                                    onClick: () =>
                                                        console.log('ver')
                                                    
                                                },
                                                {
                                                    label: 'Eliminar',
                                                    onClick: () =>
                                                        handleDeleteClick(
                                                            employee.id
                                                        ),
                                                    className: 'text-red-500 ',
                                                    iconType: BiTrash,
                                                },
                                              ]}
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
                <AlertMessageDialog
                    title='Eliminar Empleado'
                    description='¿Estás seguro de eliminar este empleado?'
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    onConfirm={handleDeleteEmployee}
                />
            </div>
        </>
    );
}
