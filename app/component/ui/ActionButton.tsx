'use client'

import React from 'react'

interface ActionButtonProps {
    name: string
    icon?: React.ReactNode
    onClick: () => void
    disabled?: boolean
}

export default function ActionButton({
    name,
    icon,
    onClick,
    disabled

}: ActionButtonProps) {
    return (
        <div className="relative inline-flex group">
            <button
                type="button"
                aria-label={name}
                onClick={onClick}
                disabled={disabled}
                className="
                    inline-flex items-center gap-2
                    rounded-md px-2.5 py-1.5
                    text-sm font-medium
                    text-editor-button
                    transition-colors duration-150
                    focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-gray-300
                    hover:bg-editor-button-hover
                    hover:text-gray-900
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
            >
                {icon}
            </button>

            {/* Tooltip */}
            <span
                role="tooltip"
                className="
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
                "
            >
                {name}
            </span>
        </div>
    )
}