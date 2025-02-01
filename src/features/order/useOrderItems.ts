

// export const useOrderItems = (orderId?: number) => {
//   const { data: orderItems, isLoading, isError, error } = useQuery<Items[]>({
//     queryKey: ['orderItems', orderId],
//     queryFn: () => getItemsByOrder(orderId!),
//     enabled: !!orderId, // Solo ejecuta la consulta si `orderId` es válido
//   })
//   return { orderItems, isLoading, isError, error }
// }