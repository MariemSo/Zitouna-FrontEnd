import React, { useState } from 'react';

interface IngredientInputProps {
    ingredient: { quantity: string; unit: string; ingredientName: string };
    index: number;
    onChange: (index: number, field: string, value: string) => void;
    onSelect: (index: number, value: string) => void;
    ingredientOptions: { id: number; name: string }[];
    unitOptions: string[];
}

export const IngredientInput: React.FC<IngredientInputProps> = ({
                                                                    ingredient,
                                                                    index,
                                                                    onChange,
                                                                    onSelect,
                                                                    ingredientOptions,
                                                                    unitOptions,
                                                                }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredIngredients, setFilteredIngredients] = useState(ingredientOptions);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(index, 'ingredientName', value);

        const filtered = ingredientOptions.filter(ing => ing.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredIngredients(filtered);
        setShowDropdown(true);
    };

    return (
        <div className="flex space-x-2">
            <div className="relative w-1/3">
                <input
                    type="text"
                    placeholder="Ingredient"
                    className="p-2 border rounded w-full"
                    value={ingredient.ingredientName}
                    onChange={handleInputChange}
                    onFocus={() => setShowDropdown(true)}
                />
                {showDropdown && (
                    <div className="absolute z-10 bg-white border rounded mt-1 w-full">
                        {filteredIngredients.map((ing) => (
                            <div
                                key={ing.id}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => {
                                    onSelect(index, ing.name);
                                    setShowDropdown(false);
                                }}
                            >
                                {ing.name}
                            </div>
                        ))}
                        {!filteredIngredients.length && (
                            <div className="p-2 text-gray-500">No matching ingredients found</div>
                        )}
                    </div>
                )}
            </div>
            <input
                type="number"
                placeholder="Quantity"
                className="p-2 border rounded w-1/3"
                value={ingredient.quantity}
                onChange={(e) => onChange(index, 'quantity', e.target.value)}
            />
            <select
                className="p-2 border rounded w-1/3"
                value={ingredient.unit}
                onChange={(e) => onChange(index, 'unit', e.target.value)}
            >
                {unitOptions.map((unit, idx) => (
                    <option key={idx} value={unit}>{unit}</option>
                ))}
            </select>
        </div>
    );
};