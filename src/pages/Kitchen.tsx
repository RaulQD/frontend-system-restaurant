import ResponsiveDialog from '@/components/ResponsiveDialog';
import TableKitchen from '../features/kitchen/TableKitchen';
export default function Kitchen() {
    return (
        <section className=''>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10'>
                <div>
                    <h1 className='font-outfit text-xl font-medium'>Cocina</h1>
                    <span className='font-outfit text-gray-400 text-sm'>
                        Aquí puedes gestionar los pedidos de tu restaurante.
                    </span>
                </div>
            </div>
            <TableKitchen />
            <ResponsiveDialog />
        </section>
    );
}
