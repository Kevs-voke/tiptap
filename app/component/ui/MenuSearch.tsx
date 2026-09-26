import React, { useState } from 'react'
import { Search } from "lucide-react";
function MenuSearch({ onExpandChange }: { onExpandChange?: (expanded: boolean) => void }) {
    const [type, setType] = useState<'text' | 'search'>('text');
    const [menusOn, setMenusOn] = useState(false);

    const updateExpanded = (val: boolean) => {
        setMenusOn(val);
        onExpandChange?.(val);
    };

    return (
        <div className="relative inline-flex w-9 h-9 group">
            <div
                className={`
                    absolute top-0 left-0 h-9 border-0 rounded-t-md
                    transition-all duration-300 ease-in-out
                    ${menusOn ? 'w-64 z-30' : 'w-9'}
                    focus-within:border-0
                    ${menusOn ? '' : 'hover:bg-editor-button-hover'}
                    ${menusOn ? 'shadow-md' : ''}
                `}
            >
                <Search
                    aria-hidden="true"
                    className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-800 w-5 h-5 z-10"
                />
                <input
                    type={type}
                    role="combobox"
                    aria-expanded={menusOn}
                    aria-controls="menu-listbox"
                    aria-autocomplete="list"
                    placeholder="Menus (Alt+/)"
                    aria-label="Menus"
                    className="h-full w-full pl-8 pr-3 py-1.5 text-sm border-0 rounded-md focus:outline-none"
                    onClick={() => {
                        setType('search');
                        updateExpanded(true);
                    }}
                    onFocus={() => updateExpanded(true)}
                    onBlur={() => updateExpanded(false)}
                />
                {menusOn && (
                    <div
                        id="menu-listbox"
                        role="listbox"
                        aria-label="Menus"
                        className="absolute top-full border-t border-editor-border left-0 w-64 bg-background z-20 shadow-md rounded-b-md"
                    >
                        <p role="option" aria-selected="false" className="px-3 py-2">
                            hellp<br />jsksk<br />jsjsjj<br />sjjsjjs<br />jkskksks
                        </p>
                    </div>
                )}
            </div>

            {!menusOn && (
                <span
                    role="tooltip"
                    className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs font-normal text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                >
                    Menus (Alt+/)
                </span>
            )}
        </div>
    )
}

export default MenuSearch