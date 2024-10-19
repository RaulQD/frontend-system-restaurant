import { getAuthenticatedUser } from "@/services/apiAuth"
import { useQuery } from "@tanstack/react-query"
import * as useLocalStorage from "@/utils/use.localstorage"
import { useEffect } from "react"

export const useUser = () => {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: getAuthenticatedUser,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialData: useLocalStorage.getUser,
  })

  useEffect(() => {
    if (!user) {
      useLocalStorage.removeUser()
    } else {
      useLocalStorage.saveUser(user)
    }
  })
  return { user, isLoading, isError, error }
}