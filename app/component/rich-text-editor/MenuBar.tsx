import React, { useState } from 'react'
import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { Bold, Printer, Redo, Undo } from 'lucide-react'

import { menuBarStateSelector } from '@/app/state/menustate'
import ToggleButton from '../ui/ToggleButton'
import MenuSearch from '../ui/MenuSearch'
import Icon from '../ui/Icon'
import ActionButton from '../ui/ActionButton'
export default function MenuBar({ editor }: { editor: Editor | null }) {
    const editorState = useEditorState({
        editor,
        selector: menuBarStateSelector,
    })

    const [searchExpanded, setSearchExpanded] = useState(false);

    if (!editor || !editorState) {
        return null
    }
    return (
        <div>
            <div className='flex flex-row print:hidden'>

                {/* Menu search */}
                <MenuSearch onExpandChange={setSearchExpanded} />

                <div
                    className={`
                        flex flex-row items-center
                        transition-opacity duration-200
                        ${searchExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                    `} >

                    {/* Undo Action Button  */}
                    <ActionButton
                        icon={<Icon icon={<Undo />} />}
                        name={'Undo (Ctrl+Z)'}
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}
                    />
                    {/* Redo Action Button */}
                    <ActionButton
                        icon={<Icon icon={<Redo />} />}
                        name={'Redo (Ctrl+Y)'}
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}
                    />
                    {/* Print Action Button */}
                    <ActionButton
                        name={'Print (ctrl+P)'}
                        icon={<Icon icon={<Printer />} />}
                        onClick={() => {
                            window.print()
                        }
                        }
                    />
                    {/* Bold toggle Button */}
                    <ToggleButton
                        isToggleOn={editorState.isBold}
                        name='Bold'
                        icon={<Icon icon={<Bold />} />}
                        onClick={() => {
                            editor.chain().focus().toggleBold().run()

                        }}
                    />

                </div>
            </div>
        </div>
    )
}