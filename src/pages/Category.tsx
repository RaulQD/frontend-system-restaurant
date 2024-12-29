import { Button } from '@/components/ui/button';
import AddCategory from '@/features/category/AddCategory';
import TableCategory from '@/features/category/TableCategory';
import { BiPlus } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Category() {
    const navigate = useNavigate()
    const loacation = useLocation();
    const queryParams = new URLSearchParams(loacation.search);
    const modalCategory = queryParams.get('createCategory');
    const open = modalCategory ? true : false;

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
                <Button variant={'principal'} onClick={()=> navigate(location.pathname + '?createCategory=true')}>
                    <BiPlus className='mr-1 text-xl text-white' />
                    Agregar category
                </Button>
            </div>
            <TableCategory />
            <AddCategory open={open} />
        </section>
    );
}
