import ResponsiveDialog from '@/components/ResponsiveDialog';
import { OrderDetails } from '@/types/order';
import OrderHistoryDetailsData from './OrderHistoryDetailsData';

type OrderHistoryModalProps = {
    orderDetails: OrderDetails;
    open: boolean;
};
export default function OrderHistoryModal({
    orderDetails,
    open,
}: OrderHistoryModalProps) {
    return (
        <ResponsiveDialog
            open={open}
            title={`Detalle de la orden # ${orderDetails.id_order}`}
            description='Aquí puedes ver el detalle de la orden seleccionada.'
            size='lg'>
           <OrderHistoryDetailsData orderDetails={orderDetails}/>
        </ResponsiveDialog>
    );
}
