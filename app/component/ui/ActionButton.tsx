'use client'

import React from 'react'
import Tooltip from './Tooltip'

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


            <Tooltip name={name} />
        </div>
    )
}