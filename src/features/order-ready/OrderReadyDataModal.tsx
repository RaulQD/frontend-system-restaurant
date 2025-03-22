import ResponsiveDialog from '@/components/ResponsiveDialog';
import { OrderDetails } from '@/types/order';
import OrderReadyDetails from './OrderReadyDetails';

type OrderReadyDataModalProps = {
    open: boolean;
    orderDetails: OrderDetails;
};
export default function OrderReadyDataModal({
    open,
    orderDetails,
}: OrderReadyDataModalProps) {
    return (
        <ResponsiveDialog
            title='Detalle del pedido'
            open={open}
            description={`Aquí puedes ver el detalle del pedido de la mesa Nro. ${orderDetails?.table?.num_table}`}
            size='md'>
            <OrderReadyDetails orderDetails={orderDetails!} />
        </ResponsiveDialog>
    );
}
