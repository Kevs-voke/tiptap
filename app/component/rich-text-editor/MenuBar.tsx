import React, { useState } from 'react'
import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { Search } from "lucide-react";
import { menuBarStateSelector } from '@/app/state/menustate'
import ToggleButton from '../ui/ToggleButton'

export default function MenuBar({ editor }: { editor: Editor | null }) {
    const editorState = useEditorState({
        editor,
        selector: menuBarStateSelector,
    })
    const [type, setType] = useState<'text' | 'search'>('text');
    const [menusOn, setMenusOn] = useState(false);


    if (!editor || !editorState) {
        return null
    }
    return (
        <div>
            <div>
                <div
                    className={`relative h-9 border-0 rounded-t-md transition-all duration-300 ease-in-out ${menusOn ? 'w-64' : 'w-9'
                        } focus-within:border-0 ${menusOn ? '' : 'hover:bg-editor-button-hover'} ${menusOn ? 'shadow-md' : ''}`}>
                    <Search
                        aria-hidden="true"
                        className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-4 h-4 z-10"
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
                            setMenusOn(true);
                        }}
                        onFocus={() => setMenusOn(true)}
                        onBlur={() => setMenusOn(false)}
                    />

                    {menusOn && (
                        <div
                            id="menu-listbox"
                            role="listbox"
                            aria-label="Menus"
                            className="absolute top-full border-t border-editor-border left-0 w-64 bg-background z-20 shadow-md rounded-b-md">
                            <p role="option" aria-selected="false" className="px-3 py-2">
                                hellp
                                <br />
                                jsksk
                                <br />
                                jsjsjj
                                <br />
                                sjjsjjs
                                <br />
                                jkskksks
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}