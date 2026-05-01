import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import type { ClientFormData,  OutletContextType } from '../../types'; 
import ClientForm from '../../components/client/ClientForm'
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../../api/OrderAPI';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function PlaceOrderModalClient() {

    const { cart, cartTotal, clearCart } = useOutletContext<OutletContextType>()
    const navigate = useNavigate()

    /** Leer si modal, existe */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('confirmOrder')
    const show = modalTask ? true : false

    const initialValues: ClientFormData = {
        clientName: '',
        contact: '',
        region: '',
        address: ''
    }

    const { register, formState: {errors}, handleSubmit, reset } = useForm({defaultValues: initialValues})

    const { mutate } = useMutation({
        mutationFn: createOrder,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess:(data) => {
            const MySwal = withReactContent(Swal)

            MySwal.fire({
                position: "center",
                icon: "success",
                title: data,
                showConfirmButton: false,
                timer: 2500
            })
            reset()
            clearCart()
            navigate(location.pathname, {replace: true})
        }
    })

    const handlePlaceOrder = (formData : ClientFormData) => {
        const data = {
            clientName: formData.clientName,
            contact: formData.contact,
            region: formData.region,
            address: formData.address,
            products: cart,
            total: cartTotal
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
                        <div className="flex min-h-full items-center justify-center p-2 text-center">
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
                                        Confirm order
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill out the form and {''}
                                        <span className="text-blue-600">place your order</span>
                                    </p>

                                    <form
                                        className='mt-8 space-y-3'
                                        onSubmit={handleSubmit(handlePlaceOrder)}
                                        noValidate
                                    >

                                        <ClientForm
                                            register={register}
                                            errors={errors}
                                        />

                                        <input 
                                            type="submit" 
                                            className='bg-blue-600 w-full p-3 hover:bg-blue-700 text-white font-bold cursor-pointer transition-colors uppercase'
                                            value='Place Order'
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