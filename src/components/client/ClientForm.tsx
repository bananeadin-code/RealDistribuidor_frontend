import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { ClientFormData } from "../../types"; 
import ErrorMessage from "../ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { getRegions } from "../../api/RegionAPI";

type ProductFormProps = {
    errors: FieldErrors<ClientFormData>
    register: UseFormRegister<ClientFormData>
}

export default function ProductForm({errors, register} : ProductFormProps) {

    const { data: regions } = useQuery({
        queryKey: ['Regions'],
        queryFn: getRegions
    })

    return (
        <>
            <div className="flex flex-col gap-3">
                <label
                    className="font-medium text-sm text-[#1a3a5c]"
                    htmlFor="clientName"
                >Name</label>
                <input
                    id="clientName"
                    type="text"
                    placeholder="Your full name"
                    className="w-full p-2  border-gray-300 border"
                    {...register("clientName", {
                        required: "Your full name is required",
                    })}
                />
                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <label
                    className="font-medium text-sm text-[#1a3a5c]"
                    htmlFor="contact"
                >Contact</label>
                <input
                    id="contact"
                    placeholder="Contact Info"
                    className="w-full p-2  border-gray-300 border"
                    {...register("contact", {
                        required: "Contact info is required",
                        pattern: {
                            value: /^(\+1[\s-]?)?(\(?\d{3}\)?[\s-]?)(\d{3}[\s-]?)(\d{4})$/, // Ejemplo para 10 dígitos exactos
                            message: "Invalid phone number"
                        }
                    })}
                />
                {errors.contact && (
                    <ErrorMessage>{errors.contact.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex gap-10 items-center">
                <label
                    className="font-medium text-sm text-[#1a3a5c]"
                    htmlFor="region"
                >Region / State</label>
                <p className="text-gray-400 text-xs">If your region is not listed here, select the nearest one.</p>
                </div>
                <select
                    id="region"
                    className="w-full p-2  border-gray-300 border"
                    {...register("region", {
                        required: "Your region is required",
                    })}
                ><option value="">-- Select --</option>
                    {regions?.map((region) => (
                    <option value={region.name}>{region.name}</option>
                ))}
                </select>
                {errors.region && (
                    <ErrorMessage>{errors.region.message}</ErrorMessage>
                )}
            </div>

             <div className="flex flex-col gap-3">
                <label
                    className="font-medium text-sm text-[#1a3a5c]"
                    htmlFor="address"
                >Address</label>
                <input
                    id="address"
                    type="text"
                    placeholder="Your address"
                    className="w-full p-2  border-gray-300 border"
                    {...register("address", {
                        required: "Your address is required",
                    })}
                />
                {errors.address && (
                    <ErrorMessage>{errors.address.message}</ErrorMessage>
                )}
            </div>

        </>
    )
}