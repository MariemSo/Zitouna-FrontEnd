import React, { useEffect, useRef } from 'react';

interface DropdownProps {
    options: { id: number; name: string }[];
    onSelect: (value: string) => void;
    onClose: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, onClose }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose(); // Close the dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={dropdownRef} className="absolute z-10 bg-white border rounded mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
            {options.length ? options.map((ing) => (
                <div
                    key={ing.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                        onSelect(ing.name);
                        onClose();
                    }}
                >
                    {ing.name}
                </div>
            )) : (
                <div className="p-2 text-gray-500">No matching ingredients found</div>
            )}
        </div>
    );
};
