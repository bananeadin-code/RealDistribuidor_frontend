import { isAxiosError } from "axios"
import api from "../lib/axios"
import { OrdersSchema, type InitialOrder, type Order } from "../types"


export async function createOrder(formData: InitialOrder) {
  try {
    const { data } = await api.post('/orders', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getOrders() {
  try {
    const { data } = await api('/orders')
    const response = OrdersSchema.safeParse(data)
    if(response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteOrder(id: Order['_id']) {
  try {
    const { data } = await api.delete<string>(`/orders/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}