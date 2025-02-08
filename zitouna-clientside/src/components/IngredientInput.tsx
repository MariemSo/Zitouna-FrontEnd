import React from 'react';
import { useDropdown } from '../hooks/useDropdown.ts';
import { Dropdown } from './Dropdown';
import { Trash2 } from 'lucide-react';

interface IngredientInputProps {
    ingredient: { quantity: string; unit: string; ingredientName: string };
    index: number;
    onChange: (index: number, field: string, value: string) => void;
    onSelect: (index: number, value: string) => void;
    onDelete: (index: number) => void;
    ingredientOptions: { id: number; name: string }[];
    unitOptions: string[];
}

export const IngredientInput: React.FC<IngredientInputProps> = ({
                                                                    ingredient,
                                                                    index,
                                                                    onChange,
                                                                    onSelect,
                                                                    onDelete,
                                                                    ingredientOptions,
                                                                    unitOptions,
                                                                }) => {
    const {
        showDropdown,
        setShowDropdown,
        filteredOptions,
        handleInputChange,
    } = useDropdown(ingredientOptions);

    const handleSelectIngredient = (value: string) => {
        onSelect(index, value);
        setShowDropdown(false);
    };

    return (
        <div className="flex space-x-2 items-center">
            <div className="relative w-1/3">
                <input
                    type="text"
                    placeholder="Ingredient"
                    className="p-2 border rounded w-full"
                    value={ingredient.ingredientName}
                    onChange={(e) => {
                        onChange(index, 'ingredientName', e.target.value);
                        handleInputChange(e.target.value, ingredientOptions);
                    }}
                    onFocus={() => setShowDropdown(true)}
                />
                {showDropdown && (
                    <Dropdown
                        options={filteredOptions}
                        onSelect={handleSelectIngredient}
                        onClose={() => setShowDropdown(false)}
                    />
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
                value={ingredient.unit||'grams'}
                onChange={(e) => {
                    console.log(`Setting unit for ingredient ${index}:`, e.target.value);
                    onChange(index, 'unit', e.target.value)
                }}
            >
                {unitOptions.map((unit, idx) => (
                    <option key={idx} value={unit}>{unit}</option>
                ))}
            </select>

            <button onClick={() => onDelete(index)} className="p-2 bg-red-500 text-white rounded"><Trash2 size={20} /></button>
        </div>
    );
};
