import React from "react";

interface SortButtonsProps {
    sortBy: "alphabetical" | "prepTime" | null;
    nameSortOrder: "asc" | "desc" | null;
    prepTimeSortOrder: "asc" | "desc" | null;
    onSort: (type: "alphabetical" | "prepTime") => void;
}

export const SortButtons: React.FC<SortButtonsProps> = ({
                                                            sortBy,
                                                            nameSortOrder,
                                                            prepTimeSortOrder,
                                                            onSort,
                                                        }) => {
    return (
        <>
            <button
                onClick={() => onSort("alphabetical")}
                className={`p-2 rounded shadow-sm focus:outline-none focus:ring-blue-500 ${
                    sortBy === "alphabetical"
                        ? "bg-[#6DAEDB] text-white"
                        : "bg-white text-black"
                }`}
            >
                Sort by Name {nameSortOrder ? (nameSortOrder === "asc" ? "↑" : "↓") : "↑↓"}
            </button>
            <button
                onClick={() => onSort("prepTime")}
                className={`p-2 rounded shadow-sm focus:outline-none focus:ring-blue-500 ${
                    sortBy === "prepTime"
                        ? "bg-[#6DAEDB] text-white"
                        : "bg-white text-black"
                }`}
            >
                Sort by Prep Time {prepTimeSortOrder ? (prepTimeSortOrder === "asc" ? "↑" : "↓") : "↑↓"}
            </button>
        </>
    );
};