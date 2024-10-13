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

export default function TableDishes() {
    const { dishes, isLoadingDishes, isErrorDishes, error } = useDishes();

    // Verificar si se están cargando los platos

    return (
        <div className='rounded-md border mt-6'>
            <div className='overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <Table className='w-full divide-y divide-gray-300'>
                    <TableHeader className='bg-slate-200'>
                        <TableRow>
                            <TableHead className='w-[300px]'>ID</TableHead>
                            <TableHead>Nombre del plato</TableHead>
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
                                <TableCell className='font-medium'>
                                    {dish.id}
                                </TableCell>
                                <TableCell>{dish.dishes_name}</TableCell>
                                <TableCell>{dish.dishes_description}</TableCell>
                                <TableCell>{dish.price}</TableCell>
                                <TableCell>
                                    {dish.category.category_name}
                                </TableCell>
                                <TableCell>{dish.available}</TableCell>
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
