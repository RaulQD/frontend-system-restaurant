import OrdersReadyData from '@/features/order-ready/OrdersReadyData';
import TableOrdersReady from '@/features/order-ready/TableOrdersReady';

export default function OrdersReady() {
    return (
        <>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 '>
                <div>
                    <h1 className='font-outfit text-xl font-medium'>
                       Ordenes Listas
                    </h1>
                    <span className='font-outfit text-gray-400 text-sm'>
                        Aquí puedes ver las ordenes listas para ser entregadas a los clientes.
                    </span>
                </div>
            </div>
            <div className='mt-14'>
                <TableOrdersReady />
            </div>
            <OrdersReadyData />
        </>
    );
}
