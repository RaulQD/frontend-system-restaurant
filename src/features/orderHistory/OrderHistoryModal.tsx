import ResponsiveDialog from '@/components/ResponsiveDialog';
import { OrderDetails } from '@/types/order';
import OrderHistoryDetailsData from './OrderHistoryDetailsData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type OrderHistoryModalProps = {
    orderDetails: OrderDetails;
    open: boolean;
};
export default function OrderHistoryModal({
    orderDetails,
    open,
}: OrderHistoryModalProps) {
    const navigate = useNavigate();
    return (
        <ResponsiveDialog
            open={open}
            title={`Detalle de la orden # ${orderDetails.id_order}`}
            description='Aquí puedes ver el detalle de la orden seleccionada.'
            size='lg'>
            <OrderHistoryDetailsData orderDetails={orderDetails} />
            <div className='flex justify-end'>
                <Button
                    type='button'
                    variant='destructive'
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
