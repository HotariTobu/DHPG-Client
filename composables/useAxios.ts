import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"

export const useAxios = () => {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 1000,
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
