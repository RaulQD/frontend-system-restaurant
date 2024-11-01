import CardCategory from '@/features/order/components/CardCategory';
import OrderList from '@/features/order/components/OrderList';

export default function Orders() {
    return (
        <section>
            <div className='sflex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <div>
                    <h1 className='font-outfit text-xl font-medium'>
                        Realizar pedido
                    </h1>
                    <span className='font-outfit text-gray-400 text-sm'>
                        Aquí puedes generar el pedido de la mesa seleccionada.
                    </span>
                </div>
            </div>
            <div className='mt-14'>
                <div className='flex'>
                    <div className='w-2/3 p-4'>
                        <div className='mb-4'>
                            <div className='overflow-y-auto h-[600px] pr-2'>
                                <div className='grid grid-cols-4 gap-4 col-span-2'>
                                    <CardCategory />
                                    <CardCategory />
                                    <CardCategory />
                                    <CardCategory />
                                    <CardCategory />
                                    <CardCategory />
                                    <CardCategory />
                                    <CardCategory />
                                    <CardCategory />
                                    <CardCategory />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3 p-4 static top-0 bg-white shadow-sm h-screen z-30 rounded-md'>
                        <OrderList />
                    </div>
                </div>
            </div>
        </section>
    );
}
