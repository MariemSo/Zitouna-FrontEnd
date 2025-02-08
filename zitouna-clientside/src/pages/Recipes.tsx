import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export function Recipes(): JSX.Element {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/recipe')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setRecipes(data.recipes);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-6 text-center text-xl">Loading recipes...</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recipes.map((recipe: { id: number; name: string ;prepTime:number; coverImage:string; category: { name:string,id:number }}) => (
                    <div key={recipe.id} className="border rounded shadow-md p-4">
                        <img src={recipe.coverImage} alt={recipe.name} className="h-32 w-full object-cover rounded mb-4" />
                        <h3 className="text-lg font-bold">{recipe.name}</h3>
                        {/*<p className="text-gray-600 text-sm">Lorem</p>*/}
                        <p className="text-sm mt-2">Category: {recipe.category.name} | Time: {recipe.prepTime} min</p>
                        <Link to={`/recipe/${recipe.id}`} className="text-blue-500">View Recipe</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
