import FilterOrder from "@/features/order/components/FilterOrder";
import MenuList from "@/features/order/components/MenuList";

export default function UpdateOrder() {

    const handleAddItemToOrder = (dishId: number) => {}
    return (
        <>
            <section>
                <div className='lg:basis-3/4 overflow-y-auto '>
                    <h1 className='font-outfit text-xl font-medium mb-4'>
                        Actualizar nueva orden en la mesa 2
                    </h1>
                    <div className='flex items-center gap-x-2 flex-nowrap max-w-full overflow-x-auto '>
                        <FilterOrder />
                    </div>
                    <div className='mt-8 mb-6'>
                        <MenuList handleAddItemToOrder={handleAddItemToOrder} />
                    </div>
                </div>
            </section>
        </>
    );
}
