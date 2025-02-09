import React from "react";

interface FiltersProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    spicinessFilter: string;
    onSpicinessChange: (spiciness: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
                                                    categories,
                                                    selectedCategory,
                                                    onCategoryChange,
                                                    spicinessFilter,
                                                    onSpicinessChange,
                                                }) => {
    return (
        <>
            {/* Category Filter */}
            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="p-2 border rounded shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {/* Spiciness Filter */}
            <select
                value={spicinessFilter}
                onChange={(e) => onSpicinessChange(e.target.value)}
                className="p-2 border rounded shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Spiciness Levels</option>
                <option value="1">Mild (1)</option>
                <option value="2">Medium (2)</option>
                <option value="3">Spicy (3)</option>
                <option value="4">Very Spicy (4)</option>
                <option value="5">Extreme (5)</option>
            </select>
        </>
    );
};