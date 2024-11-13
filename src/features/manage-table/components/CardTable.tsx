import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Restaurant from '../../../assets/restaurante.svg';
import { FaUsers } from 'react-icons/fa';
import { Tables } from '@/types/tables';

type CardTableProps = {
    table: Tables;
};

export default function CardTable({ table }: CardTableProps) {
    return (
        <Card
            className={
                table.status === 'Disponible' ? 'bg-blue-100' : 'bg-red-100'
            }>
            <CardHeader>
                <CardTitle className='text-blue-500 font-normal font-outfit'>
                    Mesa #{table.num_table}
                </CardTitle>
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
