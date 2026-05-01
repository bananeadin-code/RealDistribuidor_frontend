import type { Product } from "../../types"
import ProductDetails from "./ProductDetails"


type ProductsListProps = {
    products: Product[]
}

export default function ProductsList({products}: ProductsListProps) {
  return (
    <div className="p-2">
          <table className="w-full mt-5 table-auto">
            <thead className="hidden md:table-header-group bg-slate-800 text-white">
                {/* thead desktop */}
                <tr className="hidden md:table-row">
                  <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider w-20">Image</th>
                  <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Product</th>
                  <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Price</th>
                  <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Stock</th>
                  <th className="p-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className='block md:table-row-group'>
                {products.map( product => (
                     <ProductDetails
                        key={product._id}
                        product={product}
                     />
                ))}
            </tbody>
          </table>
        </div>
)}
