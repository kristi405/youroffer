import axios from 'axios'
import { getToken } from './auth'
import { API_URL } from './constants'
import messaging from '@react-native-firebase/messaging';

const api = axios.create({
  timeout: 100000,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  maxContentLength: 10000
})

let fcmToken;
let topic;
api.interceptors.request.use(
  async (config) => {
    const token = await getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    if (fcmToken) {
      config.headers['x-fcm'] = fcmToken
    } else {
      fcmToken = await messaging().getToken();
      config.headers['x-fcm'] = fcmToken
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default api