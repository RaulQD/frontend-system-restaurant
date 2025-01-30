import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Restaurant from '../../assets/restaurante.svg';
import { FaUsers } from 'react-icons/fa';
import { Tables } from '@/types/tables';

type CardTableProps = {
    table: Tables;
};

export default function CardTable({ table }: CardTableProps) {
    return (
        <Card
            className={
                table.status === 'DISPONIBLE' ? 'bg-blue-100' : 'bg-red-100'
            }>
            <CardHeader className='relative'>
                <CardTitle className='text-blue-500 font-normal font-outfit mt-4 text-center'>
                    Mesa #{table.num_table}
                </CardTitle>
                <div
                    className={` ${
                        table.status === 'DISPONIBLE'
                            ? 'bg-blue-500'
                            : 'bg-red-500'
                    } absolute -top-2 left-0 rounded-ss-xl p-1`}>
                    <h1 className='text-white lowercase'>{table.status}</h1>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <div className='flex items-center justify-center mb-6'>
                        <img src={Restaurant} alt='' className='size-20' />
                    </div>

                    <div className='flex items-center justify-center'>
                        <p className='text-xl font-outfit flex items-center justify-center gap-2'>
                            <FaUsers className='text-2xl text-blue-500' />
                            {table.capacity_table}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
