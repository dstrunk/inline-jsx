import { v4 as uuid } from 'uuid';
import eventBus from '../eventBus'

function AddToCart({ product, classList }) {
    const addToCart = (product) => (e) => {
        e.preventDefault()

        eventBus.publish('MINICART_ADD', {
            product,
            quantity: 1,
            message: {
                id: uuid(),
                type: 'success',
                title: `Product added to cart`,
                body: `${product.title} has been added to your cart.`,
            }
        })
    }

    return (
        <button
            className={`${classList}`}
            onClick={addToCart(product)}
        >
            Add to Cart<span className="sr-only">, {product.title}</span>
        </button>
    )
}

export default AddToCart
