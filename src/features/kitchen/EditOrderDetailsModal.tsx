import ResponsiveDialog from '@/components/ResponsiveDialog';
import { OrderDetails } from '../../types/order';
import OrderDetailsKitchen from './OrderDetailsKitchen';

type EditOrderDetailsModalProps = {
    open: boolean;
    orderDetails: OrderDetails;
    orderId: OrderDetails['id_order'];
};

export default function EditOrderDetailsModal({
    open,
    orderDetails
}: EditOrderDetailsModalProps) {

    //MOSTRAR EL NÚMERO DE LA MESA 
    console.log(orderDetails.num_table);
    const numTable = orderDetails.num_table;

    return (
        <ResponsiveDialog
            title='Detalle del pedido'
            open={open}
            description={`Aquí puedes ver el detalle del pedido de la mesa Nro. ${numTable}`}>
            <OrderDetailsKitchen orderDetails={orderDetails!} />
        </ResponsiveDialog>
    );
}
