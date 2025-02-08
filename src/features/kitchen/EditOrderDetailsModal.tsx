import ResponsiveDialog from '@/components/ResponsiveDialog';
import { OrderDetails } from '../../types/order';
import OrderDetailsKitchen from './OrderDetailsKitchen';

type EditOrderDetailsModalProps = {
    open: boolean;
    orderDetails: OrderDetails;
};

export default function EditOrderDetailsModal({
    open,
    orderDetails,
}: EditOrderDetailsModalProps) {
    //MOSTRAR EL NÚMERO DE LA MESA
    const numTable = orderDetails.num_table;

    return (
        <ResponsiveDialog
            title='Detalle del pedido'
            open={open}
            description={`Aquí puedes ver el detalle del pedido de la mesa Nro. ${numTable}`}
            size='md'>
            <OrderDetailsKitchen orderDetails={orderDetails!} />
        </ResponsiveDialog>
    );
}
