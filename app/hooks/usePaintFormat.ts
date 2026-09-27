
import { useEffect, useState } from 'react';
import type { Editor } from '@tiptap/react';

const MARKS = ['bold', 'italic', 'underline', 'strike', 'code'] as const;

export function usePaintFormat(editor: Editor | null) {
    const [copiedFormat, setCopiedFormat] = useState<string[] | null>(null);
    const [isPainting, setIsPainting] = useState(false);

    const handlePaintFormat = () => {
        if (!editor) return;

        if (isPainting) {
            setIsPainting(false);
            setCopiedFormat(null);
            return;
        }

        const availableMarks = MARKS.filter((mark) => editor.schema.marks[mark]);
        const activeMarks = availableMarks.filter((mark) => editor.isActive(mark));

        setCopiedFormat(activeMarks);
        setIsPainting(true);
    };

    useEffect(() => {
        if (!editor || !isPainting || !copiedFormat) return;

        const applyFormat = () => {
            const { from, to, empty } = editor.state.selection;
            if (empty) return;

            const chain = editor.chain().setTextSelection({ from, to });
            const availableMarks = MARKS.filter((mark) => editor.schema.marks[mark]);

            availableMarks.forEach((mark) => {
                copiedFormat.includes(mark) ? chain.setMark(mark) : chain.unsetMark(mark);
            });

            chain.run();
            setIsPainting(false);
            setCopiedFormat(null);
        };

        const dom = editor.view.dom;
        dom.addEventListener('mouseup', applyFormat);
        dom.addEventListener('keyup', applyFormat);

        return () => {
            dom.removeEventListener('mouseup', applyFormat);
            dom.removeEventListener('keyup', applyFormat);
        };
    }, [editor, isPainting, copiedFormat]);

    return { isPainting, handlePaintFormat };
}
