import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteButton from "../components/DeleteButton.tsx";

export function RecipeDetail(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        // Fetch the logged-in user's info
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const response = await fetch("http://localhost:3001/api/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setCurrentUser(data.user);
            } catch (err) {
                console.error("Error fetching user", err);
            }
        };

        const fetchRecipe = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/recipe/${id}`);
                if (!res.ok) throw new Error("Recipe not found");
                const data = await res.json();
                setRecipe(data.recipe);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUser();
        fetchRecipe();
    }, [id]);

    // Log the currentUser and recipe after they have been updated
    useEffect(() => {
        console.log("current user", currentUser);
    }, [currentUser]);

    useEffect(() => {
        console.log("Recipe Data:", recipe);
    }, [recipe]);

    console.log("Current User ID:", currentUser?.id);
    console.log("Recipe User ID:", recipe?.user.id);

    if (loading) return <div className="p-6 text-center text-xl">Loading recipe...</div>;
    if (error) return <div className="p-6 text-center text-xl">{error}</div>;
    const handleDeleteSuccess = () => {
        navigate("/");
    };
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
            <img
                src={recipe.coverImage}
                alt={recipe.name}
                className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
            />
            <p className="text-lg font-semibold">
                Time: {recipe.prepTime} | Category: {recipe.category.name}
            </p>
            <h2 className="text-2xl font-bold mt-6">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
                {recipe.ingredients.map((ingredient: { ingredient: { name: string }; quantity: string; unit: string }, index: number) => (
                    <li key={index}>{`${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredient.name}`}</li>
                ))}
            </ul>
            <h2 className="text-2xl font-bold mt-6">Steps</h2>
            <ol className="list-decimal list-inside text-gray-700 mt-2">
                {recipe.steps.map((step: { stepNumber: number; description: string }, index: number) => (
                    <li key={index}>{step.description}</li>
                ))}
            </ol>

            {/* Show edit button if current user owns the recipe */}
            {currentUser && recipe.user.id === currentUser.id && (
               <div className="flex space-x-4 mt-4">

                <button
                    onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                    Edit Recipe
                </button>
                <DeleteButton
                    recipeId={recipe.id}
                    recipeOwnerId={recipe.user.id}
                    currentUser={currentUser}
                    onDeleteSuccess={handleDeleteSuccess}
                />
               </div>
            )}
        </div>
    );
}