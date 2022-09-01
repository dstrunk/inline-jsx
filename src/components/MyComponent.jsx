import eventBus from "../eventBus"

function MyComponent(props) {
    const incrementCount = () => {
        eventBus.publish('INCREMENT_COUNT', 1)
    }

    return (
        <>
            <button onClick={() => incrementCount()}>
                Increment Count
            </button>

            {props.children && (
                <div dangerouslySetInnerHTML={{__html: `${props.children}`}}></div>
            )}
        </>
    )
}

export default MyComponent;
