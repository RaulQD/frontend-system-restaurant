import TableOrderHistory from '@/features/orderHistory/TableOrderHistory';

export default function OrderHistory() {
    return (
        <>
            <section>
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                    <div>
                        <h1 className='font-outfit text-xl font-medium'>
                            Historial de Ordenes
                        </h1>
                        <span className='font-outfit text-gray-400 text-sm'>
                            Aquí puedes ver el historial de ordenes realizadas
                            en tu restaurante.
                        </span>
                    </div>
                </div>
                <TableOrderHistory />
            </section>
        </>
    );
}
