import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchIngredients, fetchCategories, updateRecipe } from "../services/apiService";
import { useRecipeForm } from "../hooks/useRecipeForm";
import { RecipeForm } from "../components/RecipeForm";

export const EditRecipe: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        name, setName,
        coverImage, setCoverImage,
        prepTime, setPrepTime,
        spiciness, setSpiciness,
        categoryId, setCategoryId,
        categoryOptions,
        ingredients, setIngredients,
        steps, setSteps,
        ingredientOptions, setIngredientOptions,
        unitOptions,
        error, setError,
    } = useRecipeForm();

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/recipe/${id}`);
                if (!res.ok) throw new Error("Recipe not found");
                const data = await res.json();

                setName(data.recipe.name);
                setCoverImage(data.recipe.coverImage);
                setPrepTime(data.recipe.prepTime);
                setSpiciness(data.recipe.spiciness);
                setCategoryId(String(data.recipe.category.id));

                setIngredients(
                    data.recipe.ingredients.map(ing => ({
                        id: ing.id,
                        ingredientName: ing.ingredient.name, // Display name
                        ingredientId: ing.ingredient.id, // Store ID
                        quantity: ing.quantity.toString(),
                        unit: ing.unit
                    }))
                );


                setSteps(data.recipe.steps.map(step => step.description));

                const ingredientsList = await fetchIngredients();
                const categoriesList = await fetchCategories();

                console.log("Fetched Ingredients:", ingredientsList);
                console.log("Fetched Categories:", categoriesList);

                setIngredientOptions(ingredientsList);
                setCategoryId(categoriesList[0]?.id || '');
            } catch (err) {
                console.error("Error loading recipe data:", err);
                setError("Failed to load recipe data.");
            }
        };
        loadData();
    }, [id, setName, setCoverImage, setPrepTime, setSpiciness, setCategoryId, setIngredients, setSteps, setIngredientOptions, setError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !categoryId || ingredients.length === 0 || steps.length === 0) {
            setError("Please fill out all required fields.");
            return;
        }

        const formattedIngredients = ingredients.map(ing => ({
            ingredientId: ing.ingredientId,
            quantity: Number(ing.quantity),
            unit: ing.unit
        }));

        const formattedSteps = steps.map((desc, index) => ({
            stepNumber: index + 1,
            description: desc.trim()
        }));

        const updatedRecipe = {
            name: name.trim(),
            coverImage,
            prepTime: Number(prepTime),
            spiciness: Number(spiciness),
            categoryId: Number(categoryId),
            ingredients: formattedIngredients,
            steps: formattedSteps
        };
        console.log("Updating recipe with data:", updatedRecipe);

        try {
            await updateRecipe(id, updatedRecipe);
            navigate(`/recipe/${id}`);
        } catch (err) {
            console.error("Error updating recipe:", err);
            setError("Failed to update recipe.");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
            <div className="flex space-x-6">
                <div className="w-1/3">
                    <h3 className="text-xl font-semibold mb-2">Image Preview</h3>
                    {coverImage ? (
                        <img src={coverImage} alt="Cover Preview" className="w-full h-auto rounded-lg shadow-lg"/>
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
                            <span className="text-gray-500">No Image Selected</span>
                        </div>
                    )}
                </div>
                <div className="w-2/3">
                    <RecipeForm
                        name={name}
                        setName={setName}
                        coverImage={coverImage}
                        setCoverImage={setCoverImage}
                        prepTime={prepTime}
                        setPrepTime={setPrepTime}
                        spiciness={spiciness}
                        setSpiciness={setSpiciness}
                        categoryId={categoryId}
                        setCategoryId={setCategoryId}
                        categoryOptions={categoryOptions}
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                        steps={steps}
                        setSteps={setSteps}
                        ingredientOptions={ingredientOptions}
                        unitOptions={unitOptions}
                        error={error}
                        handleSubmit={handleSubmit}
                        handleIngredientChange={(index, field, value) => {
                            const updatedIngredients = [...ingredients];
                            updatedIngredients[index][field] = value;
                            setIngredients(updatedIngredients);
                        }}
                        handleIngredientSelect={(index, value) => {
                            const selectedIngredient = ingredientOptions.find(opt => opt.name === value);
                            if (selectedIngredient) {
                                const updatedIngredients = [...ingredients];
                                updatedIngredients[index] = {
                                    ...updatedIngredients[index],
                                    ingredientId: selectedIngredient.id,
                                    ingredientName: selectedIngredient.name,
                                };
                                setIngredients(updatedIngredients);
                            } else {
                                console.error(`Ingredient "${value}" not found in options.`);
                            }
                        }}

                        handleStepChange={(index, value) => {
                            const updatedSteps = [...steps];
                            updatedSteps[index] = value;
                            setSteps(updatedSteps);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
