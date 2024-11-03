import CardCategory from '@/features/order/components/CardCategory';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';

export default function Orders() {
    return (
        <section className='h-[90dvh] xl:flex xl:gap-x-4'>
            <div className='basis-4/4 lg:basis-3/4 overflow-y-auto'>
                <div className='flex items-center flex-nowrap overflow-x-auto gap-x-2 max-w-full'>
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
        </section>
    );
}
