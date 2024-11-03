import CardCategory from '@/features/order/components/CardCategory';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';

export default function Orders() {
    return (
        <section className='h-[90dvh] lg:flex lg:gap-x-4'>
            <div className='basis-4/4 lg:basis-3/4 overflow-y-auto'>
                <div className='grid grid-cols-4 gap-4 '>
                    <CardCategory />
                    <CardCategory />
                    <CardCategory />
                    <CardCategory />
                    <CardCategory />
                    <CardCategory />
                    <CardCategory />
                </div>
                <div className='mt-8 mb-6'>
                    <MenuList />
                </div>
            </div>
            <div className='xl:basis-1/4'>
                <OrderList />
            </div>
            {/* <div className=''>
                <div className='flex'>
                    <div className='w-2/3 p-4'>
                        <div className='mb-4'>
                            <div className='overflow-y-auto h-screen pr-2'>
                               
                                <div className='mt-10'>
                                    <h1 className='font-outfit text-xl font-medium'>
                                        Elije tu plato
                                    </h1>
                                    <div className='mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                                        <CardDishes />
                                        <CardDishes />
                                        <CardDishes />
                                        <CardDishes />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3 p-4 sticky top-0 bg-white shadow-sm h-[850px] rounded-md '>
                        <OrderList />
                    </div>
                </div>
            </div> */}
        </section>
    );
}
