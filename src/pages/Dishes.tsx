import Filter from '@/components/Filter';
import { Button } from '@/components/ui/button';
import TableDishes from '@/features/dishes/TableDishes';
import { BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function Dishes() {
    const navigate = useNavigate();
    return (
        <section>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <div>
                    <h1 className='font-outfit text-xl font-medium'>
                        Gestionar Platos del Menú
                    </h1>
                    <span className='font-outfit text-gray-400 text-sm'>
                        Aquí puedes gestionar los platos del menú de tu
                        restaurante.
                    </span>
                </div>
                <Button
                    variant={'principal'}
                    onClick={() =>
                        navigate('/admin/dashboard/dishes/add-dishes')
                    }>
                    <BiPlus className='mr-1 text-xl text-white' />
                    Agregar plato
                </Button>
            </div>
            <div className='mt-14'>
                <Filter />
            </div>
            <TableDishes />
        </section>
    );
}
