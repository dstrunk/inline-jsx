import { Fragment } from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import eventBus from '../eventBus'

function MiniCart() {
    const [items, setItems] = useState([])

    useEffect(() => {
        const addItemsSubscription = eventBus.subscribe('MINICART_ADD', ({ product, quantity }) => {
            const item = { ...product, quantity }
            const oldItems = [...items]
            const itemIndex = oldItems.findIndex((i) => i?.id === product.id)

            if (itemIndex < 0) {
                setItems((i) => [...i, item])
            } else {
                const updatedItem = items[itemIndex]
                updatedItem.quantity++

                setItems((i) => [...items])
            }
        })

        return () => {
            addItemsSubscription.unsubscribe()
        }
    }, [items])

    return (
        <Popover className="z-10 flow-root ml-4 text-sm lg:relative lg:ml-8">
            <Popover.Button className="flex items-center p-2 -m-2 group" data-testid="minicart-button">
                <ShoppingBagIcon
                    className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{items.length}</span>
                <span className="sr-only">items in cart, view bag</span>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                    <h2 className="sr-only">Shopping Cart</h2>

                    {items.length === 0 && (
                        <div className="max-w-2xl px-4 pt-6 mx-auto text-center" data-testid="minicart-no-items">
                            <p className="text-gray-500">
                                Your shopping cart is empty.
                            </p>
                        </div>
                    )}

                    {items.length > 0 && (
                        <form className="max-w-2xl px-4 mx-auto">
                            <ul role="list" className="divide-y divide-gray-200" data-testid="minicart-items">
                                {items.map((item) => (
                                    <li key={item.id} className="flex items-center py-6">
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="flex-none w-16 h-16 border border-gray-200 rounded-md"
                                        />
                                        <div className="flex flex-row items-center justify-start w-full lg:justify-between">
                                            <div className="ml-4 flex-0 lg:flex-auto">
                                                <h3 className="font-medium text-gray-900">
                                                    {item.title}
                                                </h3>
                                                <span className="text-gray-500">
                                                    ${item.price}
                                                </span>
                                            </div>
                                            <div className="flex-1 ml-4 text-right text-gray-500 lg:flex-end">
                                                &times; {item.quantity}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Checkout
                            </button>
                        </form>
                    )}
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default MiniCart
