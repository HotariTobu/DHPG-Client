export const usePagination = () => {
  const {query, updateQuery} = useQuery()

  const page = ref<number>()
  watch(page, nextPage => updateQuery('p', nextPage))

  const pageString = String(query.p)
  const pageValue = parseInt(pageString)

  if (Number.isNaN(pageValue)) {
    return {
      page,
    }
  }
  else {
    page.value = pageValue
    const pageOffset = pageValue - 1

    return {
      page,
      pageOffset,
    }
  }
}
