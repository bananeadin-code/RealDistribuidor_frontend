import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import type { RegionForm } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRegion } from "../../api/RegionAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function RegionFormView() {
  
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegionForm>()

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: createRegion,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      queryClient.invalidateQueries({queryKey: ['Region']})
      navigate('/admin-view-privated/manage-regions')

    }
  })

  const handleCreateRegion = (data: RegionForm) => {
    mutate(data)
  }

  return (
    <>
      <div className="flex justify-center">
       <button 
          className="w-3xs mt-2 mb-5 bg-[#185fa5] hover:bg-[#0c447c] text-white rounded-xl py-3 font-bold transition-colors"
          onClick={() => navigate('/admin-view-privated/manage-regions')}
       >
          Return
       </button>
      </div>

    <div className="mt-5 bg-linear-to-br from-sky-50 to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">

      
        <div className="bg-linear-to-r from-sky-500 to-blue-600 px-8 py-6">
          <h2 className="text-white font-extrabold text-2xl tracking-tight">Add Region</h2>
          <p className="text-sky-100 text-sm mt-1">Fill in the details to register a new region or state</p>
        </div>

     
        <form
          className="px-8 py-7 flex flex-col gap-5"
          noValidate
          onSubmit={handleSubmit(handleCreateRegion)}
        >

         
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              Region / State
            </label>
            <input
              {...register("name", {
                required: "Region / State is required",
              })}
              placeholder="Ej. California"
              className="w-full border-b-2 border-sky-200 focus:border-sky-500 bg-transparent px-1 py-2 text-sm text-sky-900 placeholder:text-sky-300 focus:outline-none transition-colors"
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

         
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              Region Code
            </label>
            <input
              {...register("code", {
                required: "Region code is required",
              })}
              placeholder="Ej. W"
              className="w-full border-b-2 border-sky-200 focus:border-sky-500 bg-transparent px-1 py-2 text-sm text-sky-900 placeholder:text-sky-300 focus:outline-none transition-colors uppercase"
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                register("code").onChange(e);
              }}
            />
            {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
          </div>

        
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              Delivery Fee ($)
            </label>
            <div className="flex items-center border-b-2 border-sky-200 focus-within:border-sky-500 transition-colors">
              <span className="text-sky-400 text-sm font-semibold pr-2">$</span>
              <input
                {...register("deliveryFee", {
                  required: "Delivery fee is required",
                })}
                type="number"
                min={0}
                step={0.01}
                placeholder="5.00"
                className="w-full bg-transparent py-2 text-sm text-sky-900 placeholder:text-sky-300 focus:outline-none"
              />
            </div>
            {errors.deliveryFee && <ErrorMessage>{errors.deliveryFee.message}</ErrorMessage>}
          </div>

          <input
            type="submit"
            value="Add Region"
            className="mt-2 w-full bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-95 text-white font-bold text-sm py-3 rounded-2xl shadow-md transition-all cursor-pointer"
          />

        </form>
      </div>
    </div>
  </>
  )
}