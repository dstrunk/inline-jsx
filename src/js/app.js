import React, { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

const kebabize = (s) => s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase())

const files = require.context('./components/', true, /\.jsx$/i, 'sync')
const components = {}
files.keys().map((key) => {
  const component = kebabize(key.split('/').pop().split('.')[0])
  const path = `./components/${key.split('/').pop().split('.')[0]}`

  components[component] = lazy(() => import(`${path}`))
})

const hasJsonStructure = (prop) => {
    if (typeof prop !== 'string') return false;

    try {
        const result = JSON.parse(prop)
        const type = Object.prototype.toString.call(result)

        return type === '[object Object]' || type === '[object Array]'
    } catch (err) {
        return false
    }
}

const getPropsFromAttributes = (element) => {
    if (element.attributes.length === 0) {
        return null;
    }

    let props = {}
    for (let index = 0; index < element.attributes.length; index++) {
        let attribute = element.attributes[index]
        if (hasJsonStructure(attribute.value)) {
            props[camelize(attribute.name)] = JSON.parse(attribute.value)
        } else {
            props[camelize(attribute.name)] = attribute.value
        }
    }

    return props;
}

Object.entries(components).forEach(([key, value]) => {
    const elements = document.getElementsByTagName(key)
    if (!elements || elements.length === 0) {
        return;
    }

    let Component = value
    for (let i = elements.length - 1; i >= 0; i--) {
        let root = document.createElement('div')

        root.dataset.react = ''
        root.dataset.component = key
        elements[i].parentNode.insertBefore(root, elements[i])
        root.appendChild(elements[i])

        let html = elements[i].innerHTML || null
        let props = getPropsFromAttributes(elements[i])

        root = createRoot(root)
        root.render(
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props}>
                    {html}
                </Component>
            </Suspense>
        )
    }
})
