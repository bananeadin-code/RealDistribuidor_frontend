import { isAxiosError } from "axios"
import api from "../lib/axios"
import { DashboardRegionSchema, OneRegionSchema, type Region, type RegionForm } from "../types"

export async function createRegion(formData: RegionForm) {
  try {
    const { data } = await api.post('/region', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getRegions() {
  try {
    const { data } = await api('/region')
    const response = DashboardRegionSchema.safeParse(data)
    if(response.success){
        return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getRegionById(id: Region['_id']) {
  try {
    const { data } = await api(`/region/${id}`)
    const response = OneRegionSchema.safeParse(data)
    if(response.success){
        return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

type updateRegionProps = {
  id: Region['_id'],
  formData: RegionForm
}

export async function updateRegion({id, formData}: updateRegionProps) {
  try {
    const url = `/region/${id}`
    const { data } = await api.put(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteRegion(id : string) {
  try {
    const url = `/region/${id}`
    const { data } = await api.delete(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}