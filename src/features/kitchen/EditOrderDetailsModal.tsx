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
    return (
        <ResponsiveDialog
            title='Detalles del Pedido'
            open={open}
            description='Aquí puedes ver el detalle del pedido.'>
            <OrderDetailsKitchen orderDetails={orderDetails!} />
        </ResponsiveDialog>
    );
}
