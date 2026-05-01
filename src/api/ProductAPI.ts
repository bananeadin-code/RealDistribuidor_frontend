import { isAxiosError } from "axios"
import api from "../lib/axios"
import { dashboardProductSchema, type Product } from "../types"

export async function createProduct(formData: FormData) {
  try {
    const { data } = await api.post('/products/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' } // Indicar que vienen multiples archivos, en este caso file y objeto
    })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProducts() {
    try {
        const { data } = await api('/products')
        const response = dashboardProductSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProductById(id: Product['_id']) {
    try {
        const { data } = await api(`/products/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type updateProductProps = {
    productId: Product['_id']
    formData: FormData
}

export async function updateProduct({productId, formData} : updateProductProps) {
    try {
        const url = `/products/${productId}`
        const { data } = await api.put<string>(url, formData, {
         headers: { 'Content-Type': 'multipart/form-data' }
        })
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProduct(productId : Product['_id']) {
    try {
        const url = `/products/${productId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}