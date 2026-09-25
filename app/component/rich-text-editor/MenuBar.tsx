import React from 'react'
import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { menuBarStateSelector } from '@/app/state/menustate'
import ToggleButton from '../ui/ToggleButton'

export default function MenuBar({ editor }: { editor: Editor | null }) {
    const editorState = useEditorState({
        editor,
        selector: menuBarStateSelector,
    })

    if (!editor || !editorState) {
        return null
    }
    return (
        <div>
            <div>
                <ToggleButton
                    isToggleOn={editorState.isBold}
                    name="Bold"
                    icon={<strong>B</strong>}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                />
            </div>
        </div>
    )
}
