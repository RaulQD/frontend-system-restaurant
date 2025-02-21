import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { useOrderHistory } from './useOrderHistory';
import Spinner from '@/components/Spinner';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils';
import PaginationI from '@/components/PaginationI';

import { useState } from 'react';
import AlertMessageDialog from '@/components/AlertMessageDialog';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderHistoryData from './OrderHistoryData';
import DropdownActions from '@/components/DropdownActions';

export default function rTableOrderHistory() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [isDelete, setIsDelete] = useState(false);
    const [idOrder, setIdOrder] = useState<number>();
    const { orders, isLoadingOrders, isErrorsOrders, error } =
        useOrderHistory();
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
            case 'PENDIENTE':
                return (
                    <Badge
                        variant='warning'
                        className='text-white font-semibold'>
                        PENDIENTE
                    </Badge>
                );
            case 'EN PROCESO':
                return (
                    <Badge variant='info' className='text-white font-semibold'>
                        EN PROCESO
                    </Badge>
                );
            case 'LISTO PARA SERVIR':
                return (
                    <Badge
                        variant='served'
                        className='text-black font-semibold'>
                        LISTO PARA SERVIR
                    </Badge>
                );
            case 'LISTO PARA PAGAR':
                return (
                    <Badge
                        variant='successdark'
                        className='text-black font-semibold'>
                        LISTO PARA PAGAR
                    </Badge>
                );
            case 'CANCELADO':
                return (
                    <Badge
                        variant='destructive'
                        className='text-white font-semibold'>
                        CANCELADO
                    </Badge>
                );

            case 'PAGADO':
                return (
                    <Badge
                        variant='success'
                        className='text-white font-semibold'>
                        PAGADO
                    </Badge>
                );

            case 'CREADO':
                return (
                    <Badge
                        variant='default'
                        className='text-white font-semibold'>
                        CREADO
                    </Badge>
                );

            default:
                return (
                    <Badge
                        variant='secondary'
                        className='text-white font-semibold'>
                        Des conocido
                    </Badge>
                );
        }
    };
    const handleOpenModal = (orderId: number) => {
        searchParams.set('orderDetails', String(orderId));
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };
    const handleDeleteOrder = (dishId: number) => {
        console.log('Eliminar plato', dishId);
    };

    if (isLoadingOrders) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }
    if (isErrorsOrders) {
        return (
            <div className='flex justify-center items-center h-96'>
                <span className='text-lg'>{error?.message}</span>
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
                            <TableHead>Número de orden</TableHead>
                            <TableHead>Nombre del Empleado</TableHead>
                            <TableHead>Creación de Orden</TableHead>
                            <TableHead>Finalización de Orden</TableHead>
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
                                <TableCell> {order.order_number}</TableCell>
                                <TableCell>
                                    {order.employee.names}{' '}
                                    {order.employee.last_name}
                                </TableCell>

                                <TableCell>
                                    {getDateToOrder(order.created_at)}
                                </TableCell>
                                <TableCell>
                                    {getDateToOrder(order.updated_at)}
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
                                        <DropdownActions
                                            actions={[
                                                {
                                                    label: 'Ver Detalles',
                                                    onClick: () =>
                                                        handleOpenModal(
                                                            order.id_order
                                                        ),
                                                    iconType: BiPencil,
                                                },
                                                {
                                                    label: 'Eliminar',
                                                    onClick: () => {
                                                        setIdOrder(
                                                            order.id_order
                                                        );
                                                        setIsDelete(true);
                                                    },
                                                    iconType: BiTrash,
                                                    className: 'text-red-500',
                                                },
                                            ]}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <PaginationI totalItems={orders?.pagination.totalOrders!} />
            <OrderHistoryData />
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
