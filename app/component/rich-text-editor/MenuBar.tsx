import React, { useState } from 'react'
import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { Bold, Paintbrush, Paintbrush2, PaintRoller, Pipette, Printer, Redo, SpellCheckIcon, Undo } from 'lucide-react'

import { menuBarStateSelector } from '@/app/state/menustate'
import ToggleButton from '../ui/ToggleButton'
import MenuSearch from '../ui/MenuSearch'
import Icon from '../ui/Icon'
import ActionButton from '../ui/ActionButton'


interface MenuBarProps {
    editor: Editor | null;
    onPaintFormat: () => void;
    isPainting?: boolean;
}

export default function MenuBar({ editor, onPaintFormat, isPainting }: MenuBarProps) {
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
                    {/* Spelling and grammar Check Action Button */}
                    <ActionButton
                        icon={<Icon icon={<SpellCheckIcon />} />}
                        name={'Spelling and grammar Check (Ctrl+Alt+X)'}
                        onClick={() => editor?.commands.checkSpelling()}
                    />

                    {/* Paint Format Action Button */}
                    <ToggleButton
                        icon={<Icon icon={<PaintRoller />} />}
                        name={'Paint Format'}
                        isToggleOn={isPainting ?? false}
                        onClick={onPaintFormat}
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