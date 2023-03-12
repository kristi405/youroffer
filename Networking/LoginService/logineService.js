import apiClient from "./apiClient"

export const Login = async (phone) => {
  try {
    const resp = await apiClient.post('api/v1/user/phone', {phone})
    console.log('1',resp.data)
   } catch (e) {
    console.log(e)
   }
}

export const Code = async (phone, pin) => {
  try {
    const resp = await apiClient.post('api/v1/user/pin', {phone, pin})
    console.log('1',resp.data)
   } catch (e) {
    console.log(e)
   }
}