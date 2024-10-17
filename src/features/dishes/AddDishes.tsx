import { BiChevronRight } from 'react-icons/bi';
import DishesForm from './DishesForm';

export default function AddDishes() {
    return (
        <section>
            <div className='mb-5'>
                <h1 className='text-lg font-medium mb-2'>Crear el plato</h1>
                <div className='flex items-center gap-1 text-xs text-gray-400'>
                    <span>Inicio</span>
                    <BiChevronRight />
                    <span>Platos</span>
                    <BiChevronRight />
                    <span>Crear Platos</span>
                </div>
            </div>
            <div className=''>
                <DishesForm />
            </div>
        </section>
    );
}
