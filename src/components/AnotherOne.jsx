import { useState } from "react";
import eventBus from "../eventBus";

function AnotherOne() {
    const [count, setCount] = useState(0)

    eventBus.subscribe('INCREMENT_COUNT', (inc) => setCount(count + inc))

    return <>World {count}</>
}

export default AnotherOne;
