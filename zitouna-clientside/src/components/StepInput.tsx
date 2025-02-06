import React from 'react';

interface StepInputProps {
    step: string;
    index: number;
    onChange: (index: number, value: string) => void;
}

export const StepInput: React.FC<StepInputProps> = ({ step, index, onChange }) => {
    return (
        <input
            type="text"
            placeholder={`Step ${index + 1}`}
            className="block w-full p-2 border rounded"
            value={step}
            onChange={(e) => onChange(index, e.target.value)}
        />
    );
};