import { Card, CardContent } from '@/components/ui/card';
import { FaUsers } from 'react-icons/fa';
import { Tables } from '@/types/tables';
import { BiBriefcase } from 'react-icons/bi';
import { formatCurrency } from '../../utils/formatCurrency';

type CardTableProps = {
    table: Tables;
};

export default function CardTable({ table }: CardTableProps) {
    const firstName = table.employee_name?.split(' ')[0];
    const lastName = table.employee_last_name?.split(' ')[0];
    const fullName = `${firstName} ${lastName}`;

    return (
        <Card
            className={`${
                table.status === 'DISPONIBLE' ? 'bg-blue-500' : 'bg-red-500'
            } relative`}>
            <CardContent className='p-10'>
                <div className='flex flex-col gap-1'>
                    <p className='text-xl font-outfit font-semibold text-center uppercase text-white'>
                        {table.num_table}
                    </p>
                    <div>
                        {table.status === 'OCUPADO' &&
                        table.employee_name &&
                        table.employee_last_name ? (
                            <p className='text-white text-xl font-outfit font-semibold uppercase flex items-center justify-center gap-2'>
                                <BiBriefcase /> {fullName}
                            </p>
                        ) : (
                            <p className='text-white text-xl font-outfit font-semibold uppercase flex items-center justify-center gap-2'>
                                <BiBriefcase /> Sin asignar
                            </p>
                        )}
                    </div>
                    <p className='text-center text-xl font-outfit text-white font-semibold'>
                        {formatCurrency(table.total_amount ?? 0.0)}
                    </p>
                    <div>
                        <p className='text-xl font-outfit flex items-center justify-center gap-2'>
                            <FaUsers className='text-2xl text-white' />
                            <span className=' text-white'>
                                {table.capacity_table}
                            </span>
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
