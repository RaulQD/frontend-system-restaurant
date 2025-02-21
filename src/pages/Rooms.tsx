import { Button } from '@/components/ui/button';
import TableRoom from '@/features/rooms/TableRoom';
import { BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function Rooms() {
  const navigate = useNavigate();
    return (
        <section>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-14'>
                <div>
                    <h1 className='font-outfit text-xl font-medium'>
                        Gestionar los Salones
                    </h1>
                    <span className='font-outfit text-gray-400 text-sm'>
                        Aquí puedes gestionar los salones de tu restaurante.
                    </span>
                </div>
                <Button
                    variant={'principal'}
                    onClick={() =>
                        navigate(location.pathname + '?createRoom=true')
                    }>
                    <BiPlus className='mr-1 text-xl text-white' />
                    Agregar Sala
                </Button>
            </div>
            <TableRoom />
        </section>
    );
}
