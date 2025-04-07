import { useLocation } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import { getOrderSummary } from '@/services/apiOrder';
import { useQuery } from '@tanstack/react-query';
import { OrderSummary } from '@/types/order';

export default function OrderSummaryData() {
    const localtion = useLocation();
    const queryParam = new URLSearchParams(localtion.search);
    const orderId = queryParam.get('orderSummary')!;
    const open = Boolean(orderId);
    const {
        data: orderSummary,
        isError,
        error,
    } = useQuery<OrderSummary>({
        queryKey: ['orderSummary', orderId],
        queryFn: () => getOrderSummary(Number(orderId)),
        enabled: !!orderId,
    });

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    if (orderSummary) {
        return <PaymentModal open={open} orderSummary={orderSummary} />;
    }
}
