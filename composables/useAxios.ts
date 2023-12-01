import axios from "axios"

export const useAxios = () => {
  const runtimeConfig = useRuntimeConfig()

  const instance = axios.create({
    baseURL: runtimeConfig.public.API_BASE_URL,
    timeout: 3000,
  })

  instance.interceptors.response.use(res => {
    const data = {
      ...res.data,
      createdAt: res.data.createdAt && new Date(res.data.createdAt),
      updatedAt: res.data.updatedAt && new Date(res.data.updatedAt),
    }

    return {
      ...res,
      data,
    }
  })

  return instance
}
