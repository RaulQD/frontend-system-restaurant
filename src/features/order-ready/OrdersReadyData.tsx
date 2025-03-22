import { useLocation } from 'react-router-dom';
import OrderReadyDataModal from './OrderReadyDataModal';
import { useGetOrderByID } from '../kitchen/useGetOrderByID';

export default function OrdersReadyData() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order-details');
    const open = orderId ? true : false;
    const { orderDetails } = useGetOrderByID(Number(orderId!));

    if (orderDetails)
        return <OrderReadyDataModal open={open} orderDetails={orderDetails} />;
}
