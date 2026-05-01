import { useNavigate } from 'react-router-dom'
import type { Product } from '../../types'
import { formatCurrency } from '../../utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../../api/ProductAPI'
import { toast } from 'react-toastify'


type ProductDetailsProps = {
    product: Product
}

export default function ProductDetails({product} : ProductDetailsProps) {
  
    const navigate = useNavigate()
  
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
      mutationFn: deleteProduct,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ['Products']})
      }
    })
    const handleDeleteProduct = (id : Product['_id']) => {
        mutate(id)
    }

  return (
    <>
      {/* Mobile */}
      <tr className="block md:hidden mb-3">
        <td className="block p-0">
          <div className="bg-white border border-[#185fa5]/20 rounded-xl overflow-hidden">
            <div className="flex gap-3 p-4">
              {/* Imagen */}
              <img
                src={product.image ?? ''}
                alt={product.productName}
                className="w-20 h-20 object-cover rounded-lg shrink-0 bg-[#dce8f5]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-sm font-semibold text-[#1a3a5c] ">{product.productName}</span>
                  <span className="text-sm font-bold text-[#185fa5] shrink-0">{formatCurrency(product.price)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#5a7a9a] mt-1">
                  <span>Stock: {product.stock}</span>
                  {product.stock < 30 && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      Low stock
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-[#185fa5]/10">
                  <button
                    onClick={() => navigate(location.pathname + `?editProduct=${product._id}`)}
                    className="flex-1 bg-[#185fa5] hover:bg-[#0c447c] text-white rounded-lg py-2 font-bold text-xs transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="flex-1 bg-white hover:bg-red-50 text-red-500 border border-red-200 hover:border-red-400 rounded-lg py-2 font-bold text-xs transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      {/* Desktop */}
      <tr className="hidden md:table-row border-b border-[#185fa5]/10 hover:bg-[#f0f6ff] transition-colors">
        <td className="p-3">
          <img
            src={product.image ?? ''}
            alt={product.productName}
            className="w-14 h-14 object-cover rounded-lg bg-[#dce8f5]"
          />
        </td>
        <td className="p-3 text-sm font-medium text-[#1a3a5c]">{product.productName}</td>
        <td className="p-3 text-sm font-semibold text-[#185fa5]">{formatCurrency(product.price)}</td>
        <td className="p-2 text-sm text-[#5a7a9a] flex items-center gap-1 justify-center mt-5">{product.stock}  {product.stock < 30 ? (<span className=' bg-red-500 rounded-full w-4 h-4 text-white font-bold flex items-center justify-center'>!</span>) : ''}</td>
        <td className="p-3">
          <div className="flex gap-2">
            <button
              onClick={() => navigate(location.pathname + `?editProduct=${product._id}`)}
              className="bg-[#185fa5] hover:bg-[#0c447c] text-white rounded-lg px-4 py-2 font-bold text-xs transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-white hover:bg-red-50 text-red-500 border border-red-200 hover:border-red-400 rounded-lg px-4 py-2 font-bold text-xs transition-colors"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
  </>
  )
}
