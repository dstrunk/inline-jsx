import { Fragment, useEffect, useState } from "react"

const arrayIntersect = (array1, array2) => array1.filter((val) => array2?.includes(val))

const productAttributes = [
    {
        id: 230, code: 'size', label: 'Size', options: [
            { id: 265, label: 'Small' },
            { id: 266, label: 'Medium' },
            { id: 267, label: 'Large' },
            { id: 268, label: 'X Large' },
        ]
    },
    {
        id: 231, code: 'color', label: 'Color', options: [
            { id: 275, label: 'Green' },
            { id: 276, label: 'Yellow' },
            { id: 277, label: 'Orange' },
        ]
    },
]

const validSets = {
    230: ['265', '277', '276', '275', '267', '268', '266'],
    '230-265': ['277', '276'],
    '230-266': ['275', '277'],
    '230-267': ['275', '277', '276'],
    '230-268': ['275', '277', '276'],
    231: ['265', '277', '276', '266', '275', '267', '268'],
    '231-275': ['266', '267', '268'],
    '231-276': ['265', '267', '268'],
    '231-277': ['265', '266', '267', '268'],
}

function ConfigurableProduct() {
    const [availableOptions, setAvailableOptions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState({})

    useEffect(() => {
        let options = productAttributes.map((attribute) => ({
            ...attribute,
            options: attribute.options.map((option) => {
                return {
                    ...option,
                    isValid: validSets[attribute.id]?.some((e) => e === parseInt(option.id))
                }
            })
        }))

        setAvailableOptions(options)
    }, [])

    useEffect(() => {
        const validInputs = {}
        productAttributes.forEach((attribute) => {
            const checkSets = []

            productAttributes.forEach((attribute2) => {
                if (attribute !== attribute2) {
                    if (selectedOptions[attribute2.id]) {
                        checkSets.push(validSets[`${attribute2.id}-${selectedOptions[attribute2.id]}`])
                    } else {
                        checkSets.push(validSets[attribute2.id])
                    }
                }

                if (attribute === attribute2) {
                    checkSets.push(validSets[attribute.id])
                }
            })

            if (checkSets.length === 0) {
                validInputs[attribute.id] = checkSets
            } else {
                validInputs[attribute.id] = checkSets.reduce((acc, currentValue) => {
                    if (!acc) {
                        return currentValue
                    }

                    return arrayIntersect(acc, currentValue)
                })
            }
        })

        let options = productAttributes.map((attribute) => ({
            ...attribute,
            options: attribute.options.map((option) => ({
                ...option,
                isValid: validInputs[attribute.id]?.some((e) => e == option.id)
            }))
        }))

        setAvailableOptions(options)
    }, [selectedOptions, productAttributes])

    const handleOptionClick = (option, attributeId) => (e) => {
        setSelectedOptions((opts) => ({
            ...opts,
            [attributeId]: String(option.id),
        }))
    }

    return (
        <Fragment>
            {availableOptions.length > 0 && (
                <Fragment>
                    {availableOptions.map((attribute) => (
                        <Fragment key={attribute.id}>
                            <div className={`attribute-label`}>
                                {attribute.label}
                            </div>

                            <div className={`ml-5 mr-1`}>
                                <div className={`flex flex-wrap gap-10`}>
                                    {attribute.options?.length > 0 && attribute.options.map((option) => (
                                        <label className={`relative`} key={option.id}>
                                            <input
                                                type="radio"
                                                className={`bg-transparent m-0 before:border before:border-gray-700 before:content before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 -before:z-10 checked:before:bg-gray-900 checked:before:border-gray-900`}
                                                name={`super_attribute[${attribute.id}]`}
                                                disabled={!option.isValid}
                                                value={option.id}
                                                onClick={(e) => handleOptionClick(option, attribute.id)(e)}
                                            />
                                            <span className={`text-gray-900`}>
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </Fragment>
            )}
        </Fragment>
    )
}

export default ConfigurableProduct
