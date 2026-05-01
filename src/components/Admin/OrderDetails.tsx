import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Order } from "../../types"
import { deleteOrder } from "../../api/OrderAPI"
import { toast } from "react-toastify"
import { formatDate } from "../../utils"

type OrderDetailsProps = {
    order: Order
}

export default function OrderDetails({order}: OrderDetailsProps) {

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteOrder,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['Orders']})
        }
    })

  return (
    <>
        <div className="relative bg-white border border-sky-200 rounded-2xl p-4 mb-3 shadow-sm mt-5">

          <div className="flex justify-between gap-3 items-center mb-3">
            <div className="min-w-32 max-w-42">
              <p className="text-xs text-gray-400 mt-0.5"> {formatDate(order.createdAt)}</p>
              <p className="font-bold text-sm text-sky-900 m-0">{order.clientName}</p>
              <p className="text-xs text-sky-600 mt-0.5">{order.contact}</p>
             <p className="text-xs text-sky-700 mt-0.5"><span className="text-sky-500">Region:</span> {order.region} {`(+$${order.fee})`}</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="absolute -top-2 -right-2 bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full">#{order._id.slice(-5)}</span>
              <div className="min-w-36 max-w-42">
                <span className="text-sky-500 text-xs">Address:</span>
                <p className="text-xs text-sky-700 mt-0.5"> {order.address}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-sky-100 my-2" />

          <div className="flex flex-col gap-1.5">
            {order.products.map((product) => (
              <div key={product._id} className="flex justify-between items-center">
                <span className="text-xs text-sky-800">
                  {product.productName}
                  <span className="text-sky-600"> ×{product.quantity}</span>
                </span>
                <span className="text-xs font-semibold text-sky-700">
                  ${(product.price * product.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-sky-100 my-2" />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-sky-600 uppercase tracking-wide m-0">Total</p>
              <p className="text-base font-bold text-sky-900 mt-0.5">${order.total.toFixed(2)}</p>
            </div>
            <button
              onClick={() => mutate(order._id)}
              className="bg-green-500 hover:bg-green-600 active:scale-95 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
            >
              Confirm closure
            </button>
          </div>
        </div>
    </>
  )
}
