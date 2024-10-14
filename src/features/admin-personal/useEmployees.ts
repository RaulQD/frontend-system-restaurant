import { getEmployees } from "@/services/apiEmployee"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"


export const useEmployees = () => {

  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams()
  // FILTER STATUS
  const filterStatus = searchParams.get('status') || ''
  // VALIDAR SI NO SE SELECCIONA NINGUNA OPCION DE STATUS, SE MUESTREN TODOS LOS EMPLEADOS
  const status = !filterStatus || filterStatus === 'todos' ? '' : filterStatus;

  // FILTRO DE BUSQUEDA POR NOMBRE
  const keywordValue = searchParams.get('keyword') || ''
  // VERIFICAR SI SE INGRESA UN NOMBRE PARA BUSCAR
  const keyword = !keywordValue ? '' : keywordValue

  // PAGINACIÒN
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  // useQuery -> Hook de react-query que se encarga de realizar la petición al servidor
  const { data: employees, isLoading, isError, error } = useQuery({
    queryKey: ['employees', page, keyword, status],
    queryFn: () => getEmployees({ keyword, status, page }),
    retry: false,
  })

  const pageCount = Math.ceil((employees?.pagination.totalEmployees || 0) / 10)

  // PREFETCH -> CARGA DE DATOS DE FORMA ASINCRONA 
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['employees', page + 1, keyword, status],
      queryFn: () => getEmployees({ keyword, status, page: page + 1 }),
    })
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['employees', page - 1, keyword, status],
      queryFn: () => getEmployees({ keyword, status, page: page - 1 }),
    })
  }
  return { employees, isLoading, isError, error, pageCount }
}