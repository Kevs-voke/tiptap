import React, { cloneElement, isValidElement } from 'react'

interface IconProps {
    icon: React.ReactNode
    size?: number
    className?: string
}

export default function Icon({ icon, size = 20, className = '' }: IconProps) {
    if (!isValidElement(icon)) return null

    const existingProps = icon.props as { className?: string }

    return cloneElement(icon as React.ReactElement<any>, {
        width: size,
        height: size,
        className: `shrink-0 text-gray-800 ${existingProps.className ?? ''} ${className}`.trim(),
    })
}