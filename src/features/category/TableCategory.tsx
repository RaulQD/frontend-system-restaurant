import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useGetCategories } from './useGetCategories';
import { Button } from '@/components/ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';
import Spinner from '@/components/Spinner';
import { BiTrash } from 'react-icons/bi';
import { useState } from 'react';
import EditCategoryData from './EditCategoryData';
import { Category } from '@/types/category';
import { useDeleteCategory } from './useDeleteCategory';
import AlertMessageDialog from '../../components/AlertMessageDialog';
import { useNavigate } from 'react-router-dom';

export default function TableCategory() {
    const navigate = useNavigate();

    const [editCategoryId, setEditCategoryId] = useState<number>();
    const [isDelete, setIsDelete] = useState(false);

    const { categories, isLoading, error } = useGetCategories();
    const { categoryDelete } = useDeleteCategory();

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }
    if (categories?.length === 0) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message}</p>
            </div>
        );
    }

    const handleDeleteCategory = (categoryId: Category['id']) => {
        categoryDelete(categoryId);
    };

    return (
        <div className='mt-6'>
            <div className='overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <Table className='w-full divide-y divide-gray-300'>
                    <TableHeader className='bg-slate-200'>
                        <TableRow>
                            <TableHead className='w-[200px] pl-6'>ID</TableHead>
                            <TableHead>Nombre de la categoria</TableHead>
                            <TableHead>Descripcion</TableHead>
                            <TableHead className='text-center'>
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories?.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className='font-medium pl-6'>
                                    {category.id}
                                </TableCell>
                                <TableCell>{category.category_name}</TableCell>
                                <TableCell>
                                    {category.category_description}
                                </TableCell>
                                <TableCell className='flex items-center justify-center'>
                                    <div>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                navigate(location.pathname + `?editCategory=${category.id}`)
                                            }>
                                            <Pencil1Icon className='text-lg' />
                                        </Button>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => {
                                                setEditCategoryId(category.id);
                                                setIsDelete(true);
                                            }}>
                                            <BiTrash className='text-red-500 text-lg' />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <EditCategoryData />
            <AlertMessageDialog
                isOpen={isDelete}
                setIsOpen={setIsDelete}
                title='Eliminar categoría '
                description='¿Estás seguro de eliminar la categoría?'
                onConfirm={() => {
                    handleDeleteCategory(editCategoryId!);
                }}
            />
        </div>
    );
}
