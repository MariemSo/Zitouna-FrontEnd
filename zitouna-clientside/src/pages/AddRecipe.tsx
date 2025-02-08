import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchIngredients, fetchCategories, submitRecipe } from '../services/apiService';
import { useRecipeForm } from '../hooks/useRecipeForm';
import { RecipeForm } from '../components/RecipeForm';

export const AddRecipe: React.FC = () => {
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

    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadData = async () => {
            try {
                const ingredients = await fetchIngredients();
                const categories = await fetchCategories();

                console.log("Ingredients:", ingredients);
                console.log("Categories:", categories);

                if (Array.isArray(ingredients)) {
                    setIngredientOptions?.(ingredients.sort((a, b) => a.name.localeCompare(b.name)));
                } else {
                    console.error("Invalid ingredients data:", ingredients);
                }

                if (Array.isArray(categories)) {
                    setCategoryId?.(categories[0]?.id || '');
                } else {
                    console.error("Invalid categories data:", categories);
                }
            } catch (err) {
                console.error("Error loading data:", err);
                setError("Failed to load ingredients or categories.");
            }
        };
        loadData();
    }, [setIngredientOptions, setCategoryId, setError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !categoryId || ingredients.length === 0 || steps.length === 0) {
            setError("Please fill out all required fields.");
            return;
        }

        const formattedIngredients = ingredients.map(ing => {
            const foundIngredient = ingredientOptions.find(opt => opt.name === ing.ingredientName);
            return {
                ingredientId: foundIngredient ? foundIngredient.id : null,
                quantity: ing.quantity.trim() ? Number(ing.quantity) : null,
                unit: ing.unit.trim(),
            };
        });

        if (formattedIngredients.some(ing => ing.ingredientId === null)) {
            setError("Please select valid ingredients from the list.");
            return;
        }

        if (formattedIngredients.some(ing => ing.quantity === null || isNaN(ing.quantity) || ing.quantity <= 0)) {
            setError("Each ingredient must have a valid quantity greater than 0.");
            return;
        }

        if (formattedIngredients.some(ing => !ing.unit.trim())) {
            setError("Each ingredient must have a unit (e.g., grams, cups).");
            return;
        }

        const formattedSteps = steps
            .map((desc, index) => ({ stepNumber: index + 1, description: desc.trim() }))
            .filter(step => step.description.length > 0);

        if (formattedSteps.length === 0) {
            setError("Each recipe must have at least one valid step.");
            return;
        }

        const recipeData = {
            name: name.trim(),
            coverImage,
            prepTime: Number(prepTime),
            spiciness: Number(spiciness),
            categoryId: Number(categoryId),
            ingredients: formattedIngredients,
            steps: formattedSteps
        };


        try {
            const response = await submitRecipe(recipeData, token!);
            if (!response.ok) {
                throw new Error(response.message || 'Failed to add recipe');
            }
            navigate('/');
        } catch (err: any) {
            console.error("Error submitting recipe:", err);
            setError(err.message);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Add a New Recipe</h1>
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
                            const newIngredients = [...ingredients];
                            newIngredients[index][field] = value;
                            setIngredients(newIngredients);
                        }}
                        handleIngredientSelect={(index:number, value) => {
                            const newIngredients = [...ingredients];
                            newIngredients[index].ingredientName = value;
                            setIngredients(newIngredients);
                        }}
                        handleStepChange={(index:number, value:string) => {
                            const newSteps = [...steps];
                            newSteps[index] = value;
                            setSteps(newSteps);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};