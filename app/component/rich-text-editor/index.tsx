'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import MenuBar from './MenuBar';

export default function RichTextEditor() {

    const editor = useEditor({
        extensions: [StarterKit],
        editorProps: {
            attributes: {
                class: "min-h-[1056px] w-[816px] mx-auto bg-white px-[96px] py-[72px] text-gray-900 outline-none shadow-sm mt-4.5 font-[Arial] text-[11pt] leading-[1.15]",
            }
        }
    });

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );

}
