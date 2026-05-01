import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import { toast } from 'react-toastify';
import { updateRegion } from '../../api/RegionAPI';
import RegionFormAdmin from './RegionForm';
import type { Region, RegionForm } from '../../types';

type EditRegionModalProps = {
    data: Region,
    regionId: Region['_id']
}

export default function EditRegionModal({data, regionId} : EditRegionModalProps) {

    const navigate = useNavigate()

    /** Leer si modal existe */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('editRegion')
    const show = modalTask ? true : false

    const initialValues: RegionForm = {
        name: data.name,
        code: data.code,
        deliveryFee: data.deliveryFee
    }

    const { register, handleSubmit, formState: {errors}, reset } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateRegion,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['Region']})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true}) // Quitar modal
        }
    })

    const handleUpdateRegion = (formData: RegionForm) => {
        mutate({ id: regionId, formData})
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-8">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl my-5"
                                    >
                                        <div className="bg-linear-to-r from-sky-500 to-blue-600 px-8 py-6">
                                            <h2 className="text-white font-extrabold text-2xl tracking-tight">Edit Region fee</h2>
                                            <p className="text-sky-100 text-sm mt-1">Fill in the details to edit an existing region or state</p>
                                        </div>
                                    </Dialog.Title>

                                    <form
                                        className="flex flex-col gap-5"
                                        noValidate
                                        onSubmit={handleSubmit(handleUpdateRegion)}
                                    >

                                        <RegionFormAdmin
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