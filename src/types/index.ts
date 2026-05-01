import { z } from "zod"

/** Products */
export const productSchema = z.object({
    _id: z.string(),
    productName: z.string(),
    price: z.number(),
    stock: z.number(),
    image: z.string().nullable().optional()
})

/** User Admin */
export const adminSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export const adminDashboardSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string()
})
export type Admin = z.infer<typeof adminSchema>
export type AdminRegistrationForm = Pick<Admin, 'name' | 'email' | 'password'>
export type AdminLoginForm = Pick<Admin, 'email' | 'password'>

export const dashboardProductSchema = z.array(
    productSchema.pick({
        _id: true,
        productName: true,
        price: true,
        stock: true,
        image: true
    })
)

export type Product = z.infer<typeof productSchema>

export type ProductFormData = {
  productName: string
  price: number
  stock: number
  image: FileList | undefined
}

export type NewProductCart = {
  _id: string
  productName: string
  price: number
}

export type ProductCartData = {
  _id: string
  productName: string
  price: number
  quantity: number
}

export type OutletContextType = {
  cart: ProductCartData[]
  cartTotal: number
  clearCart: () => void
  addToCart: (product: NewProductCart) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  removeFromCart: (id: string) => void
}

/** Orders */

export type ClientFormData = {
  clientName: string,
  contact: string,
  region: string,
  address: string
}

export type InitialOrder = {
  clientName: string
  contact: string
  products: ProductCartData[]
  total: number
}

export const OrdersSchema = z.array(z.object({
  _id: z.string(),
  clientName: z.string(),
  contact: z.string(),
  region: z.string(),
  address: z.string(),
  products: z.array(z.object({
    _id: z.string(),
    productName: z.string(),
    price: z.number(),
    quantity: z.number()
  })),
  fee: z.number(),
  total: z.number(),
  createdAt: z.string()
}))

const OrderSchema = z.object({
  _id: z.string(),
  clientName: z.string(),
  contact: z.string(),
  region: z.string(),
  address: z.string(),
  products: z.array(z.object({
    _id: z.string(),
    productName: z.string(),
    price: z.number(),
    quantity: z.number()
  })),
  fee: z.number(),
  total: z.number(),
  createdAt: z.string()
})

export type Order = z.infer<typeof OrderSchema>

/** Region */

export const RegionSchema = z.object({
  name: z.string(),
  code: z.string(),
  deliveryFee: z.number(),
})

export const DashboardRegionSchema = z.array(z.object({
  _id: z.string(),
  name: z.string(),
  code: z.string(),
  deliveryFee: z.number(),
}))

export const OneRegionSchema = z.object({
  _id: z.string(),
  name: z.string(),
  code: z.string(),
  deliveryFee: z.number(),
})

export type RegionForm = z.infer<typeof RegionSchema>
export type Region = z.infer<typeof OneRegionSchema>

