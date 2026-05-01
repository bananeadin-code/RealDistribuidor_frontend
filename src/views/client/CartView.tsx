import { ShoppingCartIcon } from "@heroicons/react/20/solid"
import { formatCurrency } from "../../utils"
import CartItemDetails from "../../components/client/CartItemDetails"
import { useNavigate, useOutletContext } from "react-router-dom"
import type { OutletContextType } from "../../types"
import PlaceOrderModalClient from "../../components/client/PlaceOrderModalClient"



export default function CartView() {

    const navigate = useNavigate()
    const { cart, cartTotal, clearCart } = useOutletContext<OutletContextType>()

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <ShoppingCartIcon className="w-16 h-16 mb-4 opacity-30" />
        <p className="font-semibold text-lg">Cart is empty</p>
        <button 
        className="w-3xs mt-10 bg-[#185fa5] hover:bg-[#0c447c] text-white rounded-xl py-3 font-bold transition-colors"
        onClick={() => navigate('/')}
      >
        Return
      </button>
      </div>
      
    )
  } 

  return (
    <>
    <div className="max-w-2xl mx-auto p-4 md:p-8 flex flex-col gap-4">
     <div className="flex justify-between items-center">
       <h2 className="text-xl font-bold text-[#1a3a5c]">Your Cart</h2>
       <button 
         className="bg-white hover:bg-red-50 text-red-500 border border-red-200 hover:border-red-400 py-2 px-5 text-sm rounded-lg font-bold transition-colors"
         onClick={clearCart}
       >
         Clear Cart
       </button>
     </div>

       <div className="flex flex-col gap-3 mt-3">
         {cart.map(item => (
           <CartItemDetails key={item._id} item={item} />
         ))}
       </div>

       {/* Total */}
       <div className="border-t border-[#185fa5]/20 pt-4 flex justify-between items-center">
         <span className="font-semibold text-[#1a3a5c]">Total</span>
         <span className="text-lg font-bold text-[#185fa5]">{formatCurrency(cartTotal)}</span>
       </div>

     <div className="flex flex-col gap-4 md:flex-row md:gap-7">
       <button 
         className="w-full bg-green-600 hover:bg-green-500 text-white rounded-xl py-3 font-bold transition-colors"
         onClick={() => navigate(location.pathname+'?confirmOrder=true')}
       >
         Confirm order
       </button>
       <button 
         className="w-full bg-[#185fa5] hover:bg-[#0c447c] text-white rounded-xl py-3 font-bold transition-colors"
         onClick={() => navigate('/')}
       >
         Continue Shopping
       </button>
     </div>
     </div>

      <PlaceOrderModalClient /> 

    </>
  )
}
