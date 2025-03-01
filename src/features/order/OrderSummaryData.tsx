import { useLocation } from 'react-router-dom';
import { useGetOrderSummary } from './useGetOrderSummary';
import PaymentModal from './PaymentModal';
import Spinner from '@/components/Spinner';

export default function OrderSummaryData() {
    const localtion = useLocation();
    const queryParam = new URLSearchParams(localtion.search);
    const orderId = queryParam.get('orderSummary');
    const open = orderId ? true : false;
    const { orderSummary, isLoading, isError, error } = useGetOrderSummary();
    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }
    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    if (orderSummary) {
        return <PaymentModal open={open} orderSummary={orderSummary} />;
    }
}
