import { getOrders } from "@/services/apiOrder";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";


export const useOrderHistory = () => {
  const queryclient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterStatus = searchParams.get('status') || '';
  const status = !filterStatus || filterStatus === 'todos' ? '' : filterStatus;

  const keywordValue = searchParams.get('keyword') || '';
  const keyword = !keywordValue ? '' : keywordValue;

  const startDateValue = searchParams.get('startDate') || '';
  const startDate = !startDateValue ? '' : startDateValue;

  const endDateValue = searchParams.get('endDate') || '';
  const endDate = !endDateValue ? '' : endDateValue;


  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { data: orders, isLoading: isLoadingOrders, isError: isErrorsOrders, error } = useQuery({
    queryKey: ['orders', keyword, status, startDate, endDate, page],
    queryFn: () => getOrders({ keyword, status, startDate, endDate, page }),
    retry: false,
  })
  const pageCount = Math.ceil((orders?.pagination.totalOrders || 0) / 10);

  if (page < pageCount) {
    queryclient.prefetchQuery({
      queryKey: ['orders', keyword, status, startDate, endDate, page + 1],
      queryFn: () => getOrders({ keyword, status, startDate, endDate, page: page + 1 }),
    })
  }

  if (page > 1) {
    queryclient.prefetchQuery({
      queryKey: ['orders', keyword, status, startDate, endDate, page - 1],
      queryFn: () => getOrders({ keyword, status, startDate, endDate, page: page - 1 }),
    })
  }
  return { orders, isLoadingOrders, isErrorsOrders, error, pageCount }
}