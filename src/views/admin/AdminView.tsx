import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { UserIcon } from '@heroicons/react/20/solid'
import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../../api/OrderAPI"
import { getProducts } from "../../api/ProductAPI"


export default function AdminView() {

  const navigate = useNavigate()

  const { data: admin, isLoading: adminLoading } = useAuth()

  if(adminLoading) return 'Loading...'

  const { data: orders } = useQuery({
    queryKey: ['Orders'],
    queryFn: getOrders
  })

  const { data: products } = useQuery({
    queryKey: ['Product'],
    queryFn: getProducts
  })

  const isLowStock = products?.some(product => product.stock < 30)

  const numberOfOrders = orders?.length

  const handleNavigateToProducts = () => {
    navigate('/admin-view-privated/products')
  }

  const handleNavigateToOrders = () => {
    navigate('/admin-view-privated/orders')
  }

  const handleNavigateToNewAdmin = () => {
    navigate('/admin-view-privated/create-admin')
  }

  const handleNavigateToManageRegions = () => {
    navigate('/admin-view-privated/manage-regions')
  }

  if(admin) return (
    <>
      <p className="font-black text-3xl text-center text-[#1a3a5c]">Administration Panel</p>
      <p className="text-center text-[#5a7a9a] text-sm mt-2">Manage your grocery platform here</p>
      <p className="mt-3">Hello: <span className="text-slate-600">{admin.name}</span></p>

      <div className="flex flex-col gap-5 mt-8">

        <button
          className="relative py-4 px-10 bg-[#185fa5] hover:bg-[#0c447c] rounded-xl text-white font-bold text-base transition-colors flex items-center justify-center gap-2"
          onClick={handleNavigateToProducts}
        >
          Products
          {isLowStock && (
            <span className="absolute -top-2 -right-2 inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
              ! Low stock
            </span>
          )}
        </button>

        <button
          className="py-4 px-10 bg-sky-500 hover:bg-sky-600 rounded-xl text-white font-bold text-base transition-colors flex items-center justify-center gap-2"
          onClick={handleNavigateToManageRegions}
        >
          Region fees
        </button>

        <button
          className="relative py-4 px-10 bg-green-600 hover:bg-green-700 rounded-xl text-white font-bold text-base transition-colors flex items-center justify-center gap-2"
          onClick={handleNavigateToOrders}
        >
          Orders
            {numberOfOrders! >= 1 ? (
                <span className='absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 text-white font-bold flex items-center justify-center'>{numberOfOrders}</span>
            ) : ''}
        </button>

        <div className="border-t border-[#185fa5]/15 my-2" />

        <button
          className="py-4 px-10 bg-white/70 hover:bg-white border border-[#185fa5]/25 hover:border-[#185fa5]/50 rounded-xl text-[#185fa5] font-bold text-base transition-all flex items-center justify-center gap-2"
          onClick={handleNavigateToNewAdmin}
        >
          <UserIcon className="w-5 h-5" /> Add Administrator
        </button>

      </div>
  </>
  )
}
