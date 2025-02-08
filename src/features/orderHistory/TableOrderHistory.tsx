import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { BiTrash } from 'react-icons/bi';
import { useOrderHistory } from './useOrderHistory';
import Spinner from '@/components/Spinner';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils';
import PaginationI from '@/components/PaginationI';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MdBorderVertical } from 'react-icons/md';
import { useState } from 'react';
import AlertMessageDialog from '@/components/AlertMessageDialog';

export default function TableOrderHistory() {
    const [isDelete, setIsDelete] = useState(false);
    const [idOrder, setIdOrder] = useState<number>();
    const { orders, isLoadingOrders, isErrorsOrders, error } =
        useOrderHistory();

    if (isLoadingOrders) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }
    const getDateToOrder = (date: Date) => {
        const orderDate = new Date(date);
        return orderDate.toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit', // "enero", "febrero", etc.
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    };
    const statusOrder = (status: string) => {
        switch (status) {
            case 'CANCELADO':
                return (
                    <Badge
                        variant='destructive'
                        className='text-white font-semibold'>
                        CANCELADO
                    </Badge>
                );

            case 'COMPLETADO':
                return (
                    <Badge
                        variant='success'
                        className='text-white font-semibold'>
                        COMPLETADO
                    </Badge>
                );
            default:
                return (
                    <Badge
                        variant='secondary'
                        className='text-white font-semibold'>
                        Desconocido
                    </Badge>
                );
        }
    };
    const handleDeleteOrder = (dishId: number) => {
        console.log('Eliminar plato', dishId);
    };
    return (
        <div className='mt-6'>
            <div className='overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <Table className='w-full divide-y divide-gray-300'>
                    <TableHeader className='bg-slate-200'>
                        <TableRow>
                            <TableHead className='w-[100px] pl-4'>ID</TableHead>
                            <TableHead>Creación de Orden</TableHead>
                            <TableHead>Finalización de Orden</TableHead>
                            <TableHead>Nombre del Empleado</TableHead>
                            <TableHead>Monto total</TableHead>
                            <TableHead>Estado de la orden</TableHead>
                            <TableHead className='text-center'>
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.results.map((order) => (
                            <TableRow key={order.id_order}>
                                <TableCell className='font-medium pl-6'>
                                    {order.id_order}
                                </TableCell>
                                <TableCell>
                                    {getDateToOrder(order.created_at)}
                                </TableCell>
                                <TableCell>
                                    {getDateToOrder(order.updated_at)}
                                </TableCell>
                                <TableCell>
                                    {order.employee.names}{' '}
                                    {order.employee.last_name}
                                </TableCell>
                                <TableCell>
                                    {formatCurrency(order.total)}
                                </TableCell>
                                <TableCell>
                                    {statusOrder(order.order_status)}
                                </TableCell>
                                <TableCell className='flex items-center justify-center'>
                                    <div className='flex items-center'>
                                        {/* 🔹 Dropdown Menu */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant='ghost'
                                                    size='icon'>
                                                    <MdBorderVertical className='w-5 h-5' />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end'>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        alert('Ver Detalles')
                                                    }>
                                                    Ver Detalles
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setIdOrder(
                                                            order.id_order
                                                        );
                                                        setIsDelete(true);
                                                    }}>
                                                    Cancelar Orden
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <PaginationI totalItems={orders?.pagination.totalOrders!} />
            <AlertMessageDialog
                title='Eliminar Plato'
                description='¿Estás seguro de eliminar este plato?'
                isOpen={isDelete}
                setIsOpen={setIsDelete}
                onConfirm={() => {
                    handleDeleteOrder(idOrder!);
                    setIsDelete(false);
                }}
            />
        </div>
    );
}
