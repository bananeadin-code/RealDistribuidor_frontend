import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegionForm} from "../../types";
import ErrorMessage from "../ErrorMessage";

type RegionFormProps = {
    register: UseFormRegister<RegionForm>,
    errors: FieldErrors<RegionForm>
}

export default function RegionForm({register, errors}: RegionFormProps) {
  return (
    <>
             
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
    
    </>
  )
}
