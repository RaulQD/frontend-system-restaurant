import ResponsiveDialog from '@/components/ResponsiveDialog';
import { OrderSummary } from '@/types/order';
import OrderSummaryDetails from './OrderSummaryDetails';

type PaymentModalProps = {
    open: boolean;
    orderSummary: OrderSummary;
};

export default function PaymentModal({
    open,
    orderSummary,
}: PaymentModalProps) {
    return (
        <ResponsiveDialog
            open={open}
            title='Pago'
            description='Aquí puedes realizar el pago de tu pedido'>
            <OrderSummaryDetails orderSummary={orderSummary} />
        </ResponsiveDialog>
    );
}
