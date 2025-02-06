import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IngredientInput } from '../components/IngredientInput';
import { StepInput } from '../components/StepInput';

export function AddRecipe(): JSX.Element {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [prepTime, setPrepTime] = useState(10);
    const [spiciness, setSpiciness] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [categoryOptions, setCategoryOptions] = useState<{ id: number; name: string }[]>([]);
    const [ingredients, setIngredients] = useState([{ quantity: '', unit: '', ingredientName: '' }]);
    const [steps, setSteps] = useState(['']);
    const [ingredientOptions, setIngredientOptions] = useState<{ id: number; name: string }[]>([]);
    const [unitOptions, setUnitOptions] = useState(["grams", "milliliters", "cups", "tablespoons", "teaspoons", "pieces"]);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        document.title = "Add a New Recipe";
        fetchIngredients();
        fetchCategories();
    }, []);

    const fetchIngredients = () => {
        fetch('http://localhost:3001/api/ingredient')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setIngredientOptions(data.sort((a, b) => a.name.localeCompare(b.name)));
                } else if (data.ingredients) {
                    setIngredientOptions(data.ingredients.sort((a, b) => a.name.localeCompare(b.name)));
                }
            })
            .catch((err) => {
                console.error("Error fetching ingredients:", err);
                setIngredientOptions([]);
            });
    };

    const fetchCategories = () => {
        fetch('http://localhost:3001/api/category')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCategoryOptions(data);
                } else if (data.categories) {
                    setCategoryOptions(data.categories);
                }
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
                setCategoryOptions([]);
            });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !categoryId || ingredients.length === 0 || steps.length === 0) {
            setError("Please fill out all required fields.");
            return;
        }

        // Validate and format ingredients
        const formattedIngredients = ingredients.map(ing => {
            const foundIngredient = ingredientOptions.find(opt => opt.name === ing.ingredientName);
            return {
                ingredientId: foundIngredient ? foundIngredient.id : null,
                quantity: ing.quantity.trim() ? Number(ing.quantity) : null,
                unit: ing.unit.trim(),
            };
        });

        // Validate ingredient fields
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

        // Validate steps
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

        console.log("🔵 Submitting recipe data:", recipeData);

        try {
            const response = await fetch('http://localhost:3001/api/recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(recipeData),
            });

            const responseBody = await response.json();
            console.log("🟢 Server response:", responseBody);

            if (!response.ok) {
                throw new Error(responseBody.message || 'Failed to add recipe');
            }

            navigate('/');
        } catch (err: any) {
            console.error("🔴 Error submitting recipe:", err);
            setError(err.message);
        }
    };
    const handleIngredientChange = (index: number, field: string, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const handleIngredientSelect = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index].ingredientName = value;
        setIngredients(newIngredients);
    };

    const handleStepChange = (index: number, value: string) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Add a New Recipe</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex space-x-6">
                <div className="w-1/3">
                    <h3 className="text-xl font-semibold mb-2">Image Preview</h3>
                    {coverImage ? (
                        <img src={coverImage} alt="Cover Preview" className="w-full h-auto rounded-lg shadow-lg" />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
                            <span className="text-gray-500">No Image Selected</span>
                        </div>
                    )}
                </div>
                <div className="w-2/3">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="block">Recipe Name:
                            <input type="text" className="block w-full p-2 border rounded" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </label>
                        <label className="block">Cover Image URL:
                            <input type="text" className="block w-full p-2 border rounded" value={coverImage}
                                   onChange={(e) => setCoverImage(e.target.value)}/>
                        </label>
                        <label className="block">Preparation Time (minutes):
                            <input type="number" min="10" className="block w-full p-2 border rounded" value={prepTime}
                                   onChange={(e) => setPrepTime(Math.max(10, Number(e.target.value)))}/>
                        </label>
                        <label className="block">Spiciness Level (0-5):
                            <input type="number" min="0" max="5" className="block w-full p-2 border rounded"
                                   value={spiciness}
                                   onChange={(e) => setSpiciness(Math.min(5, Math.max(0, Number(e.target.value))))}/>
                        </label>
                        <label className="block">Category:
                            <select className="p-2 border rounded w-full" value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}>
                                <option value="">Select Category</option>
                                {categoryOptions.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </label>

                        <h3 className="text-xl font-semibold">Ingredients</h3>
                        {ingredients.map((ingredient, index) => (
                            <IngredientInput
                                key={index}
                                ingredient={ingredient}
                                index={index}
                                onChange={handleIngredientChange}
                                onSelect={handleIngredientSelect}
                                ingredientOptions={ingredientOptions}
                                unitOptions={unitOptions}
                            />
                        ))}
                        <button
                            type="button"
                            className="p-2 bg-gray-500 text-white rounded"
                            onClick={() => setIngredients([...ingredients, {
                                quantity: '',
                                unit: '',
                                ingredientName: ''
                            }])}
                        >
                            + Add Ingredient
                        </button>

                        <h3 className="text-xl font-semibold">Steps</h3>
                        {steps.map((step, index) => (
                            <StepInput
                                key={index}
                                step={step}
                                index={index}
                                onChange={handleStepChange}
                            />
                        ))}
                        <button
                            type="button"
                            className="p-2 bg-gray-500 text-white rounded"
                            onClick={() => setSteps([...steps, ''])}
                        >
                            + Add Step
                        </button>

                        <button type="submit" className="mt-4 p-2 bg-black text-white rounded w-full">Submit Recipe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}