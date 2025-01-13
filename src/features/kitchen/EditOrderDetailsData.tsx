import { useLocation } from 'react-router-dom';
import EditOrderDetailsModal from './EditOrderDetailsModal';
import { useGetOrderByID } from './useGetOrderByID';

export default function EditOrderDetailsData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderDetails');
    const open = orderId ? true : false;
    const { orderDetails } = useGetOrderByID(Number(orderId));

    if (orderDetails)
        return (
            <EditOrderDetailsModal
                open={open}
                orderDetails={orderDetails}
                orderId={Number(orderId)}
            />
        );
}
