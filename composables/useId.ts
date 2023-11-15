export const useId = () => {
  const route = useRoute()
  const id = parseInt(String(route.params.id))
  if (isNaN(id)) {
    return
  }
  else {
    return id
  }
}
