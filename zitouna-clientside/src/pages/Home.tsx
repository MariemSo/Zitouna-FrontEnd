import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
            <h1 className="font-poppins-light text-3xl  text-center mb-6">Zitouna Liouma</h1>

            {heroRecipe && (
                <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-lg text-center">
                    <img src={heroRecipe.coverImage} alt={heroRecipe.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h2 className="font-poppings-bold text-2xl">{heroRecipe.name}</h2>
                    <p className="text-lg text-gray-700">Category: {heroRecipe.category.name} | Time: {heroRecipe.prepTime} min</p>
                    <Link to={`/recipe/${heroRecipe.id}`} className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">View Recipe</Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayRecipes.map((recipe) => (
                    <div key={recipe.id} className="border rounded shadow-md p-4">
                        <img src={recipe.coverImage} alt={recipe.name} className="h-32 w-full object-cover rounded mb-4" />
                        <h3 className="text-lg font-bold">{recipe.name}</h3>
                        <p className="text-sm mt-2">Category: {recipe.category.name} | Time: {recipe.prepTime} min</p>
                        <Link to={`/recipe/${recipe.id}`} className="text-blue-500">Take me There</Link>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <Link to="/recipes" className="px-4 py-2 bg-black text-white rounded">See More Recipes</Link>
            </div>
        </div>
    );
}
