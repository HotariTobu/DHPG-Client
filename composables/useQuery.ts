export const useQuery = () => {
  const route = useRoute()
  const router = useRouter()

  return {
    query: route.query,
    updateQuery: (key: string, value?: string | number, path?: string) => {
      path ??= route.path
      const query = {
        ...route.query,
        [key]: value,
      }

      const queryString = getQueryString(query)
      const url = path + queryString
      router.push(url)
    }
  }
}
