import { Button } from '@/components/ui/button';
import AddCategory from '@/features/category/AddCategory';
import TableCategory from '@/features/category/TableCategory';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';

export default function Category() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };
    return (
        <section>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <div>
                    <h1 className='font-outfit text-xl font-medium'>
                        Gestionar categorias
                    </h1>
                    <span className='font-outfit text-gray-400 text-sm'>
                        Aquí puedes gestionar a las categorias de platos de tu
                        restaurante.
                    </span>
                </div>
                <Button variant={'principal'} onClick={handleOpenModal}>
                    <BiPlus className='mr-1 text-xl text-white' />
                    Agregar category
                </Button>
            </div>
            <TableCategory />
            <AddCategory setIsOpen={setIsOpen} isOpen={isOpen}/>
        </section>
    );
}
