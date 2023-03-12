import axios from 'axios'

const apiClient = axios.create({
  timeout: 100000,
  baseURL: 'http://192.168.0.112:8888/',
  headers: {
    'Content-Type': 'application/json'
  },
  maxContentLength: 10000
})

export default apiClient