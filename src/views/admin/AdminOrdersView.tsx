import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../../api/OrderAPI"
import { useNavigate } from "react-router-dom"
import OrderDetails from "../../components/Admin/OrderDetails"


export default function AdminOrdersView() {

  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['Orders'],
    queryFn: getOrders
  })

  if(isLoading) return 'Loading...'

  if(data) return (
    <>
      {data.length ? (
        <div>
          <p className="text-center font-bold text-green-500 text-3xl">Orders</p>

          {data.map( order => (
            <OrderDetails
               key={order._id}
               order={order}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <p className="font-semibold text-lg">There's no orders...</p>
          <button 
          className="w-3xs mt-10 bg-[#185fa5] hover:bg-[#0c447c] text-white rounded-xl py-3 font-bold transition-colors"
          onClick={() => navigate('/admin-view-privated')}
          > 
            Return
          </button>
        </div>
      )}

      
    </>
  )
}
