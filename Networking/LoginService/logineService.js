import apiClient from "./apiClient"

export const Login = async (phone) => {
  try {
    const resp = await apiClient.post('api/v1/auth/login/phone', {phone})
    console.log('1',resp.data)
    return resp.data
   } catch (e) {
    console.log(e)
   }
}

export const Code = async (phone, pin) => {
  try {
    const resp = await apiClient.post('api/v1/auth/login/phone/code', {phone, pin})
    console.log('1',resp.data)
    return resp.data
   } catch (e) {
    console.log(e)
   }
}