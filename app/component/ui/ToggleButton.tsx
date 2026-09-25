'use client'

import React from 'react'

interface ToggleButtonProps {
    isToggleOn: boolean
    name: string
    icon?: React.ReactNode
    onClick: () => void
}

export default function ToggleButton({
    isToggleOn,
    name,
    icon,
    onClick
}: ToggleButtonProps) {
    return (
        <button
            type="button"
            aria-pressed={isToggleOn}
            aria-label={name}
            onClick={onClick}
            className={`
        inline-flex items-center gap-2
        rounded-md px-2.5 py-1.5
        text-sm font-medium
        transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-gray-300

        ${isToggleOn
                    ? 'bg-editor-button-active text-editor-button-active-text'
                    : 'text-editor-button hover:bg-editor-button-hover hover:text-gray-900'
                }

        disabled:cursor-not-allowed
        disabled:opacity-40
      `}
        >
            {icon}
        </button>
    )
}

