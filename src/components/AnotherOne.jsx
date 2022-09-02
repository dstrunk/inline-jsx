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

    return <>World {count}</>
}

export default AnotherOne;
