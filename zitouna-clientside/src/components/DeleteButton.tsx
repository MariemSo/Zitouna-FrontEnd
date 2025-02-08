import React, { useState } from "react";

interface DeleteButtonProps {
    recipeId: number;
    recipeOwnerId: number;
    currentUser: { id: number; role: string };
    onDeleteSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ recipeId, recipeOwnerId, currentUser, onDeleteSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this recipe?")) return;

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:3001/api/recipe/${recipeId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete recipe.");
            }

            onDeleteSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (currentUser.role !== "admin" && currentUser.id !== recipeOwnerId) {
        return null;
    }

    return (
        <div className="mt-4">
            {error && <p className="text-red-500">{error}</p>}
            <button
                onClick={handleDelete}
                style={{ backgroundColor: "#1b2b50" }}
                className="p-2 text-white rounded"
                disabled={loading}
            >
                {loading ? "Deleting..." : "Delete Recipe"}
            </button>
        </div>
    );
};

export default DeleteButton;
