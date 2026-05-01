import { useNavigate } from "react-router-dom"
import type { Region } from "../../types"
import { formatCurrency } from "../../utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRegion } from "../../api/RegionAPI"
import { toast } from "react-toastify"

type RegionDetailsProps = {
    region: Region
}

export default function RegionDetails({region}: RegionDetailsProps) {

  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteRegion,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['Region']})
    }
  })

  const handleDeleteRegion = (id: Region['_id']) => {
    mutate(id)
  }

  return (
    <>
      <tr className="block md:hidden mb-3">
        <td className="block p-0">
          <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-sm">
            <div className="flex gap-3 p-4">
             
              <div className="w-14 h-14 rounded-lg shrink-0 bg-linear-to-br from-blue-400 to-sky-500 flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg tracking-tight leading-none">
                  {region.code}
                </span>
              </div>
 
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-sm font-semibold text-blue-900">{region.name}</span>
                  <span className="text-sm font-bold text-sky-500 shrink-0">
                    {formatCurrency(region.deliveryFee)}
                  </span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Fee: {formatCurrency(region.deliveryFee)}
                </p>
 
                <div className="flex gap-2 mt-3 pt-3 border-t border-blue-100">
                  <button
                    onClick={() => navigate(location.pathname+`?editRegion=${region._id}`)}
                    className="flex-1 bg-linear-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white rounded-lg py-2 font-bold text-xs transition-all shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRegion(region._id)}
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
 
     
      <tr className="hidden md:table-row border-b border-blue-100 hover:bg-blue-50/60 transition-colors">
       
        <td className="p-3">
          <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-400 to-sky-500 flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-sm tracking-tight">{region.code}</span>
          </div>
        </td>
 
       
        <td className="p-3 text-sm font-medium text-blue-900">{region.name}</td>
 
      
        <td className="p-3 text-sm font-semibold text-sky-500">
          {formatCurrency(region.deliveryFee)}
        </td>
 
       
        <td className="p-3">
          <div className="flex gap-2">
            <button
              onClick={() => navigate(location.pathname+`?editRegion=${region._id}`)}
              className="bg-linear-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white rounded-lg px-4 py-2 font-bold text-xs transition-all shadow-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteRegion(region._id)}
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
