import { useLocation } from 'react-router-dom';
import OrderHistoryModal from './OrderHistoryModal';
import { useGetOrderByID } from '../kitchen/useGetOrderByID';

export default function OrderHistoryData() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderDetails');
    const open = orderId ? true : false;
    const { orderDetails } = useGetOrderByID(Number(orderId));

    if (orderDetails)
        return (
            <OrderHistoryModal
                orderDetails={orderDetails}
                open={open}
            />
        );
}
