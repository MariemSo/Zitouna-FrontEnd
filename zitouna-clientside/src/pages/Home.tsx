import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RecipeCard } from "../components/RecipeCard"; // Adjust the import path as needed

export function Home(): JSX.Element {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/recipe')
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data.recipes);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-6 text-center text-xl">Loading recipes...</div>;
    }

    const randomRecipes = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 4);
    const heroRecipe = randomRecipes[0];
    const displayRecipes = randomRecipes.slice(1, 4);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="font-poppins-light text-3xl text-center mb-6">Zitouna Liouma</h1>

            {/* Hero Section */}
            {heroRecipe && (
                <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={heroRecipe.coverImage}
                        alt={heroRecipe.name}
                        className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                    />
                    <div className="text-center md:text-left">
                        <h2 className="font-poppings-bold text-2xl mb-2">{heroRecipe.name}</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Category: {heroRecipe.category.name} | Time: {heroRecipe.prepTime} min
                        </p>
                        <Link
                            to={`/recipe/${heroRecipe.id}`}
                            style={{ backgroundColor: "#6DAEDB" }}
                            className="mt-4 inline-block px-4 py-2 text-white rounded hover:bg-[#5a9cc5] transition-colors duration-300"
                        >
                            View Recipe
                        </Link>
                    </div>
                </div>
            )}

            {/* Display Recipes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>

            <div className="text-center mt-6">
                <Link
                    to="/recipes"
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300"
                >
                    See More Recipes
                </Link>
            </div>
        </div>
    );
}