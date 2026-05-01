import type { Product } from "../../types"
import ProductDetailsClient from "./ProductDetailsClient"

type ProductsListClientProps = {
    products: Product[]
}

export default function ProductsListClient({products} : ProductsListClientProps) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4 md:p-8 lg:grid-cols-4">
      {products.map(product => (
        <ProductDetailsClient
          key={product._id}
          product={product}
        />
      ))}
    </div>
  )
}
