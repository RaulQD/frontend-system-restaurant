import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { formatCurrency } from '../../utils/index';
import { Badge } from '@/components/ui/badge';
import Spinner from '@/components/Spinner';

import NoImage from '@/assets/not-image-found.png';
import PaginationI from '@/components/PaginationI';
import { useDishes } from './useDishes';
import { useState } from 'react';
import { DishType } from '@/types/dish';
import EditDishData from './EditDishData';
import { useDeleteDih } from './useDeletedish';
import AlertMessageDialog from '@/components/AlertMessageDialog';
import { useNavigate } from 'react-router-dom';
import DropdownActions from '@/components/DropdownActions';

export default function TableDishes() {
    const navigate = useNavigate();
    const { dishes, isLoadingDishes, error } = useDishes();
    const { dishDelete } = useDeleteDih();
    const [dishId, setDishId] = useState<number>();
    const [isDelete, setIsDelete] = useState(false);

    // Verificar si se están cargando los platos
    if (isLoadingDishes) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }
    if (!dishes?.results.length) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message}</p>
            </div>
        );
    }
    const availableDish = (available: string) => {
        switch (available) {
            case 'DISPONIBLE':
                return (
                    <Badge variant='success' className='text-white font-bold'>
                        Disponible
                    </Badge>
                );
            case 'NO DISPONIBLE':
                return (
                    <Badge
                        variant='destructive'
                        className='text-white font-bold'>
                        No Disponible
                    </Badge>
                );
        }
    };

    //ELEMINAR PLATO
    const handleDeleteDish = (dishId: DishType['id']) => {
        dishDelete(dishId);
    };

    return (
        <div className='mt-6'>
            <div className='overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <Table className='w-full divide-y divide-gray-300'>
                    <TableHeader className='bg-slate-200'>
                        <TableRow>
                            <TableHead className='w-[100px] pl-4'>ID</TableHead>
                            <TableHead>Plato</TableHead>
                            <TableHead>Imagen</TableHead>
                            <TableHead>Descripciòn</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className='text-center'>
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dishes?.results.map((dish) => (
                            <TableRow key={dish.id}>
                                <TableCell className='font-medium pl-6'>
                                    {dish.id}
                                </TableCell>

                                <TableCell>{dish.dishes_name}</TableCell>
                                <TableCell>
                                    <img
                                        src={dish?.image_url || NoImage}
                                        alt={dish.dishes_name}
                                        className='w-10 h-10'
                                    />
                                </TableCell>
                                <TableCell>{dish.dishes_description}</TableCell>
                                <TableCell>
                                    {formatCurrency(dish.price)}
                                </TableCell>
                                <TableCell>
                                    {dish.category.category_name}
                                </TableCell>
                                <TableCell>
                                    {availableDish(dish.available)}
                                </TableCell>
                                <TableCell className='flex items-center justify-center'>
                                    <DropdownActions
                                        actions={[
                                            {
                                                label: 'Editar',
                                                onClick: () =>
                                                    navigate(
                                                        location.pathname +
                                                            `?editDish=${dish.id}`
                                                    ),
                                                iconType: BiPencil,
                                            },
                                            {
                                                label: 'Eliminar',
                                                onClick: () => {
                                                    setDishId(dish.id);
                                                    setIsDelete(true);
                                                },
                                                className: 'text-red-500',
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
            <PaginationI totalItems={dishes?.pagination.totalDishes || 0} />
            <EditDishData />

            <AlertMessageDialog
                title='Eliminar Plato'
                description='¿Estás seguro de eliminar este plato?'
                isOpen={isDelete}
                setIsOpen={setIsDelete}
                onConfirm={() => {
                    handleDeleteDish(dishId!);
                    setIsDelete(false);
                }}
            />
        </div>
    );
}
