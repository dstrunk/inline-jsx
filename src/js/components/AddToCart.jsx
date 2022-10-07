import eventBus from '../eventBus'

function AddToCart({ product }) {
    const addToCart = (product) => (e) => {
        e.preventDefault()

        eventBus.publish('MINICART_ADD', { product, quantity: 1 })
    }

    return (
        <button
            className=""
            onClick={addToCart(product)}
        >
            Add<span className="sr-only"> {product.title}</span> to Cart
        </button>
    )
}

export default AddToCart
