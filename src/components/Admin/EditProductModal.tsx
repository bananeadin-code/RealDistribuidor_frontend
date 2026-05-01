import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ProductForm from './ProductForm';
import type { Product, ProductFormData } from '../../types'; 
import { toast } from 'react-toastify';
import { updateProduct } from '../../api/ProductAPI';

type EditProductModalProps = {
    data: Product,
    productId: Product['_id']
}

export default function EditProductModal({data, productId} : EditProductModalProps) {

    const navigate = useNavigate()

    /** Leer si modal existe */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('editProduct')
    const show = modalTask ? true : false

    const initialValues: ProductFormData = {
        productName: data.productName,
        price: data.price,
        stock: data.stock,
        image: undefined
    }

    const { register, handleSubmit, formState: {errors}, reset } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProduct,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['Products']})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true}) // Quitar modal
        }
    })

    const handleUpdateProduct = (formData: ProductFormData) => {
        const data = new FormData()
        data.append('productName', formData.productName)
        data.append('price', String(formData.price))
        data.append('stock', String(formData.stock))
        if (formData.image?.[0]) {
          data.append('image', formData.image[0])
        }
        mutate({ productId, formData: data })
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Edit Product
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill out the form and update  {''}
                                        <span className="text-blue-600">an existing product</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleUpdateProduct)}
                                        noValidate
                                    >

                                        <ProductForm
                                            register={register}
                                            errors={errors}
                                        />

                                        <input 
                                            type="submit" 
                                            className='bg-blue-600 w-full p-3 hover:bg-blue-700 text-white font-bold cursor-pointer transition-colors uppercase'
                                            value='Save Changes'
                                        />
                                    </form>
                                    

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}