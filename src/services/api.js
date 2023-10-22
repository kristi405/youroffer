import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  timeout: 100000,
  baseURL: 'http://62.171.164.180:8888/',
  headers: {
    'Content-Type': 'application/json'
  },
  maxContentLength: 10000
})


api.interceptors.request.use(
  async (config) => {
    const token = await getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default api