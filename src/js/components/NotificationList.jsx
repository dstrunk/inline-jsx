import { Fragment, useEffect, useState } from 'react'
import eventBus from '../eventBus'
import Notification from './Notification'


function NotificationList() {
    const [messages, setMessages] = useState([])

    const close = (message) => (e) => {
        setMessages(messages.filter((m) => m.id !== message.id))
    }

    useEffect(() => {
        eventBus.subscribe('MINICART_ADD', ({ message }) => {
            setMessages((m) => [...m, message])
        })
    }, [])

    return (
        <>
            <div
                aria-live="assertive"
                className="fixed inset-0 z-20 flex items-end px-4 py-6 pointer-events-none sm:items-start sm:p-6"
            >
                {messages.length > 0 && (
                    <Fragment>
                        <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
                            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                            {messages.map((message) => (
                                <Notification message={message} key={message.id} close={close} />
                            ))}
                        </div>
                    </Fragment>
                )}
            </div>
        </>
    )
}

export default NotificationList
