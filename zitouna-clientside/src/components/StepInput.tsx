import React from 'react';
import { Trash2 } from 'lucide-react';

interface StepInputProps {
    step: string;
    index: number;
    onChange: (index: number, value: string) => void;
    onDelete: (index: number) => void;
}

export const StepInput: React.FC<StepInputProps> = ({ step, index, onChange, onDelete }) => {
    return (
        <div className="flex space-x-2 items-center">
            <input
                type="text"
                placeholder={`Step ${index + 1}`}
                className="block w-full p-2 border rounded"
                value={step}
                onChange={(e) => onChange(index, e.target.value)}
            />
            <button onClick={() => onDelete(index)} className="p-2 bg-red-500 text-white rounded"><Trash2 size={20} /></button>
        </div>
    );
};
