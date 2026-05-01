import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../api/ProductAPI"
import ProductsListClient from "../../components/client/ProductsListClient"
import { useState } from "react"


export default function DashboardView() {
    const { data, isLoading } = useQuery({
      queryKey: ['Products'],
      queryFn: getProducts
    })

    const [ search, setSearch ] = useState('')

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setSearch(e.target.value)
    }
    const productsInSearch = Array.from(data?.filter(product => product.productName.toLowerCase().includes(search.toLowerCase())) ?? [])

    if(isLoading) return 'Loading...'

if(data) return (
    <>
      <p className="font-bold text-indigo-500 text-3xl">Products</p>
      <p className="mt-3 font-semibold text-slate-400 text-xl">Add to cart your <span className="text-blue-500">favorite products</span></p>

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
            placeholder="Search products..."
            value={search}
            onChange={handleChangeSearch}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#c8d8ea] bg-white text-sm text-[#2c4a6e] placeholder-[#8aaac8] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fb5] focus:border-transparent transition"
          />
        </div>
      </div>

      <ProductsListClient products={productsInSearch} />
    
    </>

    
  )
}
