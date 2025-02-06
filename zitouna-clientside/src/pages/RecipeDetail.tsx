import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function RecipeDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/recipe/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Recipe not found");
          }
          return res.json();
        })
        .then((data) => {
          setRecipe(data.recipe);
          console.log(data.recipe);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-xl">Loading recipe...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-xl">{error}</div>;
  }

  return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
        <img
            src={recipe.coverImage}
            alt={recipe.name}
            className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
        />
        {/*<p className="text-gray-700 mb-4">{recipe.description}</p>*/}
        <p className="text-lg font-semibold">
          Time: {recipe.prepTime} | Category: {recipe.category.name}
        </p>
        <h2 className="text-2xl font-bold mt-6">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {recipe.ingredients.map((ingredient: {
            ingredient: { name: string },
            quantity: string,
            unit: string
          }, index: number) => (
              <li key={index}>{`${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredient.name}`}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold mt-6">Steps</h2>
        <ol className="list-decimal list-inside text-gray-700 mt-2">
          {recipe.steps.map((step: {
            stepNumber: number,
            description: string,
          }, index: number) => (
              <li key={index}>{step.description}</li>
          ))}
        </ol>
</div>
)
  ;
}