'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import SpellcheckerExtension from '@farscrl/tiptap-extension-spellchecker'
import { LanguageToolProofreader } from '../../utilities/Languagetoolproofreader';
import { usePaintFormat } from '../../hooks/usePaintFormat'; // adjust path to match where you saved it

import React, { useMemo } from 'react'
import MenuBar from './MenuBar';

export default function RichTextEditor() {

    const proofreader = useMemo(() => new LanguageToolProofreader('en-US'), []);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            SpellcheckerExtension.configure({
                proofreader,
                uiStrings: { noSuggestions: 'No suggestions found' },
            }),
        ],
        editorProps: {
            attributes: {
                class: "min-h-[1056px] w-[816px] mx-auto bg-white px-[96px] py-[72px] text-gray-900 outline-none shadow-sm mt-4.5 font-[Arial] text-[11pt] leading-[1.15]",
            }
        }
    }, [proofreader]);

    const { isPainting, handlePaintFormat } = usePaintFormat(editor);

    return (
        <div>
            <MenuBar editor={editor} onPaintFormat={handlePaintFormat} isPainting={isPainting} />
            <EditorContent editor={editor} />
        </div>
    );

}