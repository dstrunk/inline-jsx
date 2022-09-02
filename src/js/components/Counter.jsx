import { useEffect, useState } from "react";
import eventBus from "../eventBus";

function AnotherOne() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const subscription = eventBus.subscribe('INCREMENT_COUNT', (inc) => setCount(count + inc))

        return () => {
            subscription.unsubscribe()
        }
    })

    return (
        <>
            <h2>Counter Component</h2>
            <div>
                Using the event bus, this component subscribes to changes
                published by the other two components.
            </div>
            <div>
                <br />
                Current count: <strong>{count}</strong>
            </div>
        </>
    )
}

export default AnotherOne;
