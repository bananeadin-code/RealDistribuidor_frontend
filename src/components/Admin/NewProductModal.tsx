import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ProductForm from './ProductForm';
import type { ProductFormData } from '../../types'; 
import { toast } from 'react-toastify';
import { createProduct } from '../../api/ProductAPI';

export default function NewProductModal() {

    const navigate = useNavigate()

    /** Leer si modal existe */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newProduct')
    const show = modalTask ? true : false

    const initialValues: ProductFormData = {
        productName: '',
        price: 0,
        stock: 0,
        image: undefined
    }

    const { register, handleSubmit, formState: {errors}, reset } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createProduct,
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

    const handleCreateProduct = (formData: ProductFormData) => {
        const data = new FormData()
        data.append('productName', formData.productName)
        data.append('price', String(formData.price))
        data.append('stock', String(formData.stock))
        if (formData.image?.[0]) {
          data.append('image', formData.image[0])
        }
        mutate(data)
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-12">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        New Product
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill out the form and add  {''}
                                        <span className="text-blue-600">a new Product</span>
                                    </p>

                                    <form
                                        className='mt-8 space-y-3'
                                        onSubmit={handleSubmit(handleCreateProduct)}
                                        noValidate
                                    >

                                        <ProductForm
                                            register={register}
                                            errors={errors}
                                        />

                                        <input 
                                            type="submit" 
                                            className='bg-blue-600 w-full p-3 hover:bg-blue-700 text-white font-bold cursor-pointer transition-colors uppercase'
                                            value='Add Product'
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