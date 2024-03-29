import axios from 'axios'
import { getToken } from './auth'
import { API_URL } from './constants'

const api = axios.create({
  timeout: 100000,
  baseURL: API_URL,
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