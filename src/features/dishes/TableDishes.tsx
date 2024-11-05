import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { BiDotsVertical } from 'react-icons/bi';
import { useDishes } from './useDishes';
import Spinner from '@/components/Spinner';
import { formatCurrency } from '../../utils/index';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NoImage from '@/assets/not-image-found.png';
import PaginationI from '@/components/PaginationI';

export default function TableDishes() {
    const { dishes, isLoadingDishes, error } = useDishes();

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
    return (
        <div className='mt-6'>
            <div className='overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <Table className='w-full divide-y divide-gray-300'>
                    <TableHeader className='bg-slate-200'>
                        <TableRow>
                            <TableHead className='w-[200px] pl-6'>ID</TableHead>
                            <TableHead>Nombre del plato</TableHead>
                            <TableHead>Imagen</TableHead>
                            <TableHead>Descripciòn</TableHead>
                            <TableHead>Costo del plato</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className='text-right'>
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
                                    {dish.available === 'Disponible' ? (
                                        <Badge
                                            variant='success'
                                            className='text-white font-bold'>
                                            {dish.available}
                                        </Badge>
                                    ) : (
                                        <Badge variant='destructive'>
                                            {dish.available}
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className='flex items-end justify-end'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <BiDotsVertical className='h-6 w-6 cursor-pointer text-gray-500' />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent sideOffset={5}>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        console.log('editando')
                                                    }>
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        console.log(
                                                            'eliminando'
                                                        )
                                                    }>
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <PaginationI totalItems={dishes?.pagination.totalDishes || 0} />
        </div>
    );
}
