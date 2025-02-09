import { useState, useEffect } from 'react';

export function useDropdown(options: { id: number; name: string }[]) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);

    const handleInputChange = (inputValue: string) => {
        if (!inputValue.trim()) {
            setFilteredOptions(getRandomIngredients(options, 5));
        } else {
            setFilteredOptions(options.filter(opt =>
                opt.name.toLowerCase().includes(inputValue.toLowerCase())
            ));
        }
    };

    useEffect(() => {
        setFilteredOptions(getRandomIngredients(options, 5));
    }, [options]);

    return {
        showDropdown,
        setShowDropdown,
        filteredOptions,
        handleInputChange
    };
}

function getRandomIngredients(options: { id: number; name: string }[], count: number) {
    const shuffled = [...options].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
