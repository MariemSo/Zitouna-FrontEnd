import React from "react";

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <input
            type="text"
            placeholder="Search by recipe name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 p-2 border rounded shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
};