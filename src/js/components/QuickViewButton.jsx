import { Fragment, useState } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline"
import AddToCartButton from "./AddToCartButton"

const classNames = () => {

}

function QuickViewButton({ product, classList }) {
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <button
                className={`${classList}`}
                onClick={() => setOpen(!open)}
            >
                Quick View
            </button>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 hidden transition-opacity bg-gray-500 bg-opacity-75 md:block" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-stretch justify-center min-h-full text-center md:items-center md:px-2 lg:px-4">
                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                                <Dialog.Panel className="flex w-full text-base text-left transition transform md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                    <div className="relative flex items-center w-full px-4 pb-8 overflow-hidden bg-white shadow-2xl pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        <button
                                            type="button"
                                            className="absolute text-gray-400 top-4 right-4 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                                        </button>

                                        <div className="grid items-start w-full grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                                            <div className="overflow-hidden bg-gray-100 rounded-lg aspect-w-2 aspect-h-3 sm:col-span-4 lg:col-span-5">
                                                <img src={product.image} alt="" className="object-cover object-center" />
                                            </div>
                                            <div className="sm:col-span-8 lg:col-span-7">
                                                <h2 className="text-xl font-medium text-gray-900 sm:pr-12">{product.title}</h2>

                                                <section aria-labelledby="information-heading" className="mt-1">
                                                    <h3 id="information-heading" className="sr-only">
                                                        Product information
                                                    </h3>

                                                    <p className="font-medium text-gray-900">{product.price}</p>
                                                    <p className="mt-4 text-sm text-gray-600">{product.description}</p>
                                                </section>

                                                <section aria-labelledby="options-heading" className="mt-8">
                                                    <h3 id="options-heading" className="sr-only">
                                                        Product options
                                                    </h3>

                                                    <form>
                                                        <AddToCartButton
                                                            product={product}
                                                            classList="relative flex items-center justify-center px-8 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200">
                                                            Add to bag
                                                        </AddToCartButton>
                                                    </form>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </Fragment>
    )
}

export default QuickViewButton
