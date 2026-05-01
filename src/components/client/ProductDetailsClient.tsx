import type { OutletContextType, Product } from "../../types"
import { formatCurrency } from "../../utils"
import { useOutletContext } from "react-router-dom"

type ProductDetailsClientProps = {
    product: Product
}

export default function ProductDetailsClient({product}: ProductDetailsClientProps) {

    const { cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useOutletContext<OutletContextType>()

    const productInCart = cart.find(p => p._id === product._id)

    const handleAddToCart = (product : Product) => {
      addToCart({
        _id: product._id,
        productName: product.productName,
        price: product.price
      })
    }

    const handleIncrement = (id : Product['_id']) => {
      increaseQuantity(id)
    }

    const handleDecrement = (id : Product['_id']) => {
      if(productInCart!.quantity === 1) {
        removeFromCart(id)
      } else {
      decreaseQuantity(id)
      }
    }

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-[#185fa5]/15 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      
      <div className="bg-[#dce8f5] flex items-center justify-center p-4 h-36">
        <img
          src={product.image ?? ''}
          alt={product.productName}
          className="h-full w-full object-contain"
        />
      </div>

     
      <div className="p-3 flex flex-col gap-2 flex-1">
       
        <span className="text-xs font-semibold text-[#1a3a5c] leading-tight line-clamp-2 min-h-10">
          {product.productName}
        </span>

       
        <p className="text-sm font-bold text-[#185fa5]">
          {formatCurrency(product.price)}
          <span className="text-xs text-gray-400 font-normal ml-1">/ piece</span>
        </p>

       
       {productInCart ? (
          <div className="flex items-center justify-between mt-auto bg-[#f0f6ff] rounded-xl px-1 py-1 border border-[#d0e4f7]">
            <button
              onClick={() => handleDecrement(product._id)}
              className="w-8 h-8 rounded-lg bg-white shadow-sm border border-[#d0e4f7] text-[#185fa5] font-bold text-lg flex items-center justify-center hover:bg-[#185fa5] hover:text-white hover:border-[#185fa5] active:scale-90 transition-all duration-150"
            >
              −
            </button>
            <span className="text-[#185fa5] font-bold text-sm min-w-6 text-center">
              {productInCart.quantity}
            </span>
            <button
              onClick={() => handleIncrement(product._id)}
              className="w-8 h-8 rounded-lg bg-[#185fa5] shadow-sm text-white font-bold text-lg flex items-center justify-center hover:bg-[#0c447c] active:scale-90 transition-all duration-150"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-auto w-full bg-[#185fa5] hover:bg-[#0c447c] active:scale-95 text-white rounded-xl py-2.5 font-bold text-xs transition-all duration-150"
          >
            Add to cart
          </button>
        )}
        
      </div>
    </div>
    </>
  )
}
