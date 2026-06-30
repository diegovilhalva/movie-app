import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md bg-gray-800 border-gray-700 text-white placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 ' +
                className
            }
            ref={localRef}
        />
    );
});