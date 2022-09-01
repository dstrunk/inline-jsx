const events = {}
let eventId = 0

const publish = (event, ...args) => {
  const callback = events[event]
  if (!callback) return console.warn(`${event} not found`)

  for (let id in callback) {
    callback[id](...args)
  }
}

const subscribe = (event, callback) => {
  if (!events[event]) {
    events[event] = {}
  }

  const id = eventId++
  events[event][id] = callback

  return {
    unsubscribe: () => {
      delete events[event][id]

      if (Object.keys(events[event]).length === 0) {
        delete events[event]
      }
    }
  }
}

export default { publish, subscribe }
