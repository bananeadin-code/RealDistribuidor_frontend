import { useNavigate } from "react-router-dom"
import NewProductModal from "../../components/Admin/NewProductModal"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../api/ProductAPI"
import ProductsList from "../../components/Admin/ProductsList"
import EditProductData from "../../components/Admin/EditProductData"
import { useState } from "react"


export default function AdminProductsView() {

  const { data, isLoading } = useQuery({
    queryKey: ['Products'],
    queryFn: getProducts
  })

  const navigate = useNavigate()

  const [ search, setSearch ] = useState('')
  
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const productsInSearch = Array.from(data?.filter(product => product.productName.toLowerCase().includes(search.toLowerCase())) ?? [])

  if(isLoading) return 'Loading...'

  if (data) return (
    <>
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl text-black">Products</p>
        <button 
          className="py-3 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold text-xl"
          onClick={() => navigate(location.pathname + '?newProduct=true')}>
        Add Product</button>
      </div>

    <div className="flex items-center gap-3 max-w-xl mx-auto mt-8 px-4">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a7a9a]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={handleChangeSearch}
          placeholder="Search products..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#c8d8ea] bg-white text-sm text-[#2c4a6e] placeholder-[#8aaac8] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fb5] focus:border-transparent transition"
        />
      </div>
    </div>

      <ProductsList
        products={productsInSearch}
      />
      <NewProductModal />
      <EditProductData/>
    </>
  )
}
