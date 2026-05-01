import { useOutletContext } from "react-router-dom"
import type { OutletContextType, Product, ProductCartData } from "../../types"
import { formatCurrency } from "../../utils"
import { TrashIcon } from "@heroicons/react/20/solid"

type CartItemDetailsProps = {
  item: ProductCartData
}

export default function CartItemDetails({ item }: CartItemDetailsProps) {

  const { removeFromCart, increaseQuantity, decreaseQuantity } = useOutletContext<OutletContextType>()

  const handleIncrement = (id : Product['_id']) => {
        increaseQuantity(id)
      }
  
      const handleDecrement = (id : Product['_id']) => {
        if(item.quantity > 1) {
          decreaseQuantity(id)
        }
      }

  return (
    <div className="relative bg-white rounded-2xl border border-[#185fa5]/15 shadow-sm p-6 flex items-center gap-4">
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1a3a5c] leading-tight line-clamp-2 min-h-10">{item.productName}</p>
        <div className="flex items-center max-w-32 justify-between mt-auto bg-[#f0f6ff] rounded-xl px-1 py-1 border border-[#d0e4f7]">
          <button
            onClick={() => handleDecrement(item._id)}
            className="w-8 h-8 rounded-lg bg-white shadow-sm border border-[#d0e4f7] text-[#185fa5] font-bold text-lg flex items-center justify-center hover:bg-[#185fa5] hover:text-white hover:border-[#185fa5] active:scale-90 transition-all duration-150"
          >
            −
          </button>
          <span className="text-[#185fa5] font-bold text-sm min-w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleIncrement(item._id)}
            className="w-8 h-8 rounded-lg bg-[#185fa5] shadow-sm text-white font-bold text-lg flex items-center justify-center hover:bg-[#0c447c] active:scale-90 transition-all duration-150"
          >
            +
          </button>
        </div>
      </div>

      {/* Precio */}
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-[#185fa5]">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <p className="text-xs text-gray-400">{formatCurrency(item.price)} per piece</p>
      </div>

      <button 
        className='absolute -top-2 -left-2 bg-red-500 rounded-full w-8 h-8 p-1 text-white font-bold flex items-center justify-center'
        onClick={() => removeFromCart(item._id)}
      >
        <TrashIcon/>
      </button>
    </div>
  )
}