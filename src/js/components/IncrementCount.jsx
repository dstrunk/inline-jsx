import eventBus from "../eventBus"

function MyComponent(props) {
    const incrementCount = () => {
        eventBus.publish('INCREMENT_COUNT', 1)
    }

    return (
        <>
            {props.children && (
                <div dangerouslySetInnerHTML={{__html: `${props.children}`}}></div>
            )}

            <button onClick={() => incrementCount()}>
                Increment Count
            </button>
        </>
    )
}

export default MyComponent;