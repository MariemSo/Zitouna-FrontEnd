import { Link } from "react-router-dom";

interface Recipe {
    id: string;
    name: string;
    coverImage: string;
    category: {
        name: string;
    };
    prepTime: number;
    spiciness?: number; // Optional, depending on your data
}

interface RecipeCardProps {
    recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps): JSX.Element {
    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <img
                src={recipe.coverImage}
                alt={recipe.name}
                className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{recipe.name}</h3>
            <p className="text-sm text-gray-700 mb-4">
                Category: {recipe.category.name} | Time: {recipe.prepTime} min
                {recipe.spiciness !== undefined && ` | Spiciness: ${recipe.spiciness}`}
            </p>
            <Link
                to={`/recipe/${recipe.id}`}
                style={{ backgroundColor: "#6DAEDB" }}
                className="inline-block px-4 py-2 text-white rounded hover:bg-[#5a9cc5] transition-colors duration-300"
            >
                Take me There
            </Link>
        </div>
    );
}