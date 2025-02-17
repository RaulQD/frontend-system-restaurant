import { Button } from '@/components/ui/button';
import TablesList from '@/features/tables/TablesList';
import { BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function Tables() {
    const navigate = useNavigate();

    return (
        <section>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <div>
                    <h1 className='font-outfit text-xl font-medium'>
                        Gestionar de las Mesas
                    </h1>
                    <span className='font-outfit text-gray-400 text-sm'>
                        Aquí puedes gestionar las mesas de tu restaurante.
                    </span>
                </div>
                <Button
                    variant={'principal'}
                    onClick={() =>
                        navigate(location.pathname + '?createTable=true')
                    }>
                    <BiPlus className='mr-1 text-xl text-white' />
                    Agregar Mesa
                </Button>
            </div>
            <TablesList />
        </section>
    );
}
