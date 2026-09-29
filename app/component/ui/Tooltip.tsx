import React from 'react'


type Props = {
    name: string
    hidden?: boolean
}

function Tooltip({ name, hidden = false }: Props) {
    return (
        <span
            role="tooltip"
            className={`
                pointer-events-none
                absolute left-1/2 top-full z-50
                mt-2 -translate-x-1/2
                whitespace-nowrap
                rounded-md bg-gray-800
                px-2 py-1
                text-xs font-normal text-white
                opacity-0
                transition-opacity duration-150
                group-hover:opacity-100
                ${hidden ? 'group-hover:opacity-0' : ''}
            `}
        >
            {name}
        </span>
    )
}

export default Tooltip