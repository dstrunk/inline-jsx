import { useEffect, useState } from 'react'
import eventBus from '../eventBus'

function MiniCart() {
    const [items, setItems] = useState([])
    const [isVisible, setIsVisible] = useState(true)

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
        <div>
            {items.length}
        </div>
    )
}

export default MiniCart
