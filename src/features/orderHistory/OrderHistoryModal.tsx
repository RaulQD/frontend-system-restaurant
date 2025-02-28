import ResponsiveDialog from '@/components/ResponsiveDialog';
import { OrderDetailsHistory } from '@/types/order';
import OrderHistoryDetailsData from './OrderHistoryDetailsData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type OrderHistoryModalProps = {
    orderDetailsHistory: OrderDetailsHistory;
    open: boolean;
};
export default function OrderHistoryModal({
    orderDetailsHistory,
    open,
}: OrderHistoryModalProps) {
    const navigate = useNavigate();
    return (
        <ResponsiveDialog
            open={open}
            title={`Detalle de la orden # ${orderDetailsHistory.order_number}`}
            description='Aquí puedes ver el detalle de la orden seleccionada.'
            size='lg'>
            <OrderHistoryDetailsData orderDetailsHistory={orderDetailsHistory} />
            <div className='flex justify-end'>
                <Button
                    type='button'
                    variant='secondary'
                    className='mt-4'
                    onClick={() =>
                        navigate(location.pathname, { replace: true })
                    }>
                    Cerrar
                </Button>
            </div>
        </ResponsiveDialog>
    );
}
