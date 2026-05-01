import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { ProductFormData } from "../../types"; 
import ErrorMessage from "../ErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

type ProductFormProps = {
    errors: FieldErrors<ProductFormData>
    register: UseFormRegister<ProductFormData>
}

export default function ProductForm({errors, register} : ProductFormProps) {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const productId = queryParams.get('editProduct')!
    const queryClient = useQueryClient()
    queryClient.invalidateQueries({queryKey: ['Product']})

    return (
        <>
            <div className="flex flex-col gap-3">
                <label
                    className="font-medium text-sm text-[#1a3a5c]"
                    htmlFor="productName"
                >Product Name</label>
                <input
                    id="productName"
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-2  border-gray-300 border"
                    {...register("productName", {
                        required: "The Product Name is Required",
                    })}
                />
                {errors.productName && (
                    <ErrorMessage>{errors.productName.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <label
                    className="font-medium text-sm text-[#1a3a5c]"
                    htmlFor="price"
                >Price</label>
                <input
                    id="price"
                    placeholder="Product Price"
                    className="w-full p-2  border-gray-300 border"
                    {...register("price", {
                        required: "The Price is Required"
                    })}
                />
                {errors.price && (
                    <ErrorMessage>{errors.price.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col md:flex-row justify-between">
            
            {productId ? (
             <div className="flex flex-col gap-2">
                <label htmlFor="image" className="font-medium text-sm text-[#1a3a5c]">New image {'(optional)'}</label>
                <label
                  htmlFor="image"
                  className="w-full p-3 border border-[#185fa5]/25 border-dashed rounded-xl bg-white text-[#aac0d8] cursor-pointer hover:border-[#185fa5] hover:text-[#185fa5] transition-colors flex items-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <span className="text-sm" id="file-label">Click to Change Current Image</span>
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"                    
                  {...register("image")}
                  onChange={(e) => {
                    register("image").onChange(e)
                    const name = e.target.files?.[0]?.name
                    const label = document.getElementById('file-label')
                    if (label) label.textContent = name ?? 'Click to upload an image'
                  }}
                />
                {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
            </div>
            ) : (
            <div className="flex flex-col gap-2">
                <label htmlFor="image" className="font-medium text-sm text-[#1a3a5c]">Image</label>
                <label
                  htmlFor="image"
                  className="w-full p-3 border border-[#185fa5]/25 border-dashed rounded-xl bg-white text-[#aac0d8] cursor-pointer hover:border-[#185fa5] hover:text-[#185fa5] transition-colors flex items-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <span className="text-sm" id="file-label">Click to upload an image</span>
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"                    
                  {...register("image", {
                    required: "Product Image is Required",
                  })}
                  onChange={(e) => {
                    register("image").onChange(e)
                    const name = e.target.files?.[0]?.name
                    const label = document.getElementById('file-label')
                    if (label) label.textContent = name ?? 'Click to upload an image'
                  }}
                />
                {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
            </div>
            )}
             

            <div className="flex flex-col gap-3">
                <label
                    className="font-medium text-sm text-[#1a3a5c] mt-2 md:mt-0"
                    htmlFor="stock"
                >Stock</label>
                <input
                    id="stock"
                    placeholder="Product Stock"
                    className="w-full p-2  border-gray-300 border"
                    {...register("stock", {
                        required: "The Stock is Required"
                    })}
                />
                {errors.stock && (
                    <ErrorMessage>{errors.stock.message}</ErrorMessage>
                )}
            </div>
        </div>

        </>
    )
}