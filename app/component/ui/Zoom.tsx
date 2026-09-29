import React, { useRef, useState } from 'react';
import Icon from './Icon';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Tooltip from './Tooltip';

function Zoom() {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState("Fit")

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (!input) return;

        if (e.target === input) return;

        e.preventDefault();

        if (document.activeElement === input) {
            input.blur();
        } else {
            input.focus();
        }
    };

    return (
        <div className="relative group inline-block">
            <div
                className="inline-flex flex-row focus-within:border-2 
            focus-within:border-[#0b57d0] w-20 h-8 rounded-sm 
            focus-within:bg-editor-button-hover hover:bg-editor-button-hover "
                onMouseDown={handleMouseDown}>
                <input
                    className='focus:outline-0 w-full pl-1.5'
                    ref={inputRef}
                    type="text"
                    defaultValue="Fit"
                    aria-label="Zoom level"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => setInputValue(e.target.value)} />
                <span className="pointer-events-none focus:outline-0 w-full  flex justify-center items-center">
                    <Icon
                        icon={
                            focused
                                ? <ChevronUp size={16} strokeWidth={2} />
                                : <ChevronDown size={16} strokeWidth={2} />
                        }
                    />
                </span>

            </div>
            <Tooltip name='Zoom' />
        </div>
    );
}

export default Zoom;