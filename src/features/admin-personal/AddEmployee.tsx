import { BiChevronRight } from 'react-icons/bi';
import EmployeeForm from './EmployeeForm';

export default function AddEmployee() {
    return (
        <section>
            <div className='mb-5'>
                <h1 className='text-lg font-medium mb-2'>Crear empleados</h1>
                <div className='flex items-center gap-1 text-xs text-gray-400'>
                    <span>Inicio</span>
                    <BiChevronRight />
                    <span>Platos</span>
                    <BiChevronRight />
                    <span>Crear Empleados</span>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <EmployeeForm />
            </div>
        </section>
    );
}
