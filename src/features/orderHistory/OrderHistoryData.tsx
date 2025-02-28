import { useLocation } from 'react-router-dom';
import OrderHistoryModal from './OrderHistoryModal';
import { useGetOrderHistoryByOrderId } from './useGetOrderHistoryByOrderId';

export default function OrderHistoryData() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderDetails');
    const open = orderId ? true : false;
    const { orderDetailsHistory } = useGetOrderHistoryByOrderId(
        Number(orderId)
    );
    console.log(orderDetailsHistory);

    if (orderDetailsHistory)
        return (
            <OrderHistoryModal
                orderDetailsHistory={orderDetailsHistory}
                open={open}
            />
        );
}
