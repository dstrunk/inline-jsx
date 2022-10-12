import { Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

/**
 * Types: 'success', 'info', 'warning', 'error'
 */
const icon = (type) => {
    switch (type) {
        case 'info':
            return <InformationCircleIcon className="w-6 h-6 text-blue-500" aria-hidden="true" />

        case 'warning':
            return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" aria-hidden="true" />

        case 'error':
            return <ExclamationCircleIcon className="w-6 h-6 text-red-500" aria-hidden="true" />

        case 'success':
        default:
            return <CheckCircleIcon className="w-6 h-6 text-green-400" aria-hidden="true" />
    }
}

function Notification({ message, close }) {
    const [show, setShow] = useState(true)

    return (
        <Transition
            appear={true}
            show={show}
            afterLeave={close(message)}
            as={Fragment}
        >
            <Transition.Child
                as={'div'}
                className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5"
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-200"
                leaveFrom="translate-y-0 sm:translate-x-0 opacity-100"
                leaveTo="translate-y-2 sm:translate-y-0 sm:translate-x-2 opacity-0"
            >
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            {icon(message.type)}
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm font-medium text-gray-900">{message.title}</p>
                            <p className="mt-1 text-sm text-gray-500">{message.body}</p>
                        </div>
                        <div className="flex flex-shrink-0 ml-4">
                            <button
                                type="button"
                                className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setShow(!show)}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    )
}

export default Notification
