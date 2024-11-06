import FilterOrder from '@/features/order/components/FilterOrder';
import MenuList from '@/features/order/components/MenuList';
import OrderList from '@/features/order/components/OrderList';

export default function Orders() {
    // const [searchParams, setSearchParams] = useSearchParams();
    // const currentFilterValue = searchParams.get('category') || '';

    // const { data: categories } = useQuery<Category[]>({
    //     queryKey: ['category'],
    //     queryFn: getCategories,
    // })
    // const handleCategoryClick = (categoryName: string) => {
    //     setSearchParams({ category: categoryName }); // Actualiza la URL con el filtro de categoría
    // };

    return (
        <section className='h-[90dvh] xl:flex xl:gap-x-4'>
            <div className='basis-4/4 lg:basis-3/4 overflow-y-auto '>
                <h1 className='font-outfit text-xl font-medium mb-4'>
                    Orden de la mesa 1
                </h1>
                <div className='flex items-center gap-x-2 flex-nowrap max-w-full overflow-x-auto '>
                    <FilterOrder />
                </div>
                <div className='mt-8 mb-6'>
                    <MenuList />
                </div>
            </div>
            <div className='lg:basis-1/4'>
                <OrderList />
            </div>
        </section>
    );
}
