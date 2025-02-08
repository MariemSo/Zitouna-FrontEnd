// RecipeForm.tsx
import React from 'react';
import { IngredientInput } from './IngredientInput';
import { StepInput } from './StepInput';

interface RecipeFormProps {
    name: string;
    setName: (value: string) => void;
    coverImage: string;
    setCoverImage: (value: string) => void;
    prepTime: number;
    setPrepTime: (value: number) => void;
    spiciness: number;
    setSpiciness: (value: number) => void;
    categoryId: string;
    setCategoryId: (value: string) => void;
    categoryOptions: { id: number; name: string }[];
    ingredients: any[];
    setIngredients: (ingredients: any[]) => void;
    steps: string[];
    setSteps: (steps: string[]) => void;
    ingredientOptions: any[];
    unitOptions: string[];
    error: string;
    handleSubmit: (e: React.FormEvent) => void;
    handleIngredientChange: (index: number, field: string, value: string) => void;
    handleIngredientSelect: (index: number, value: string) => void;
    handleStepChange: (index: number, value: string) => void;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({
                                                          name,
                                                          setName,
                                                          coverImage,
                                                          setCoverImage,
                                                          prepTime,
                                                          setPrepTime,
                                                          spiciness,
                                                          setSpiciness,
                                                          categoryId,
                                                          setCategoryId,
                                                          categoryOptions,
                                                          ingredients,
                                                          setIngredients,
                                                          steps,
                                                          setSteps,
                                                          ingredientOptions,
                                                          unitOptions,
                                                          error,
                                                          handleSubmit,
                                                          handleIngredientChange,
                                                          handleIngredientSelect,
                                                          handleStepChange
                                                      }) => {
    const removeIngredient = (index: number) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const removeStep = (index: number) => {
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps(updatedSteps);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <label className="block">
                Recipe Name:
                <input type="text" className="block w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label className="block">
                Cover Image URL:
                <input type="text" className="block w-full p-2 border rounded" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
            </label>

            <label className="block">
                Preparation Time (minutes):
                <input type="number" min="10" className="block w-full p-2 border rounded" value={prepTime} onChange={(e) => setPrepTime(Number(e.target.value))} />
            </label>

            <label className="block">
                Spiciness Level (0-5):
                <input type="number" min="0" max="5" className="block w-full p-2 border rounded" value={spiciness} onChange={(e) => setSpiciness(Number(e.target.value))} />
            </label>

            <label className="block">
                Category:
                <select className="p-2 border rounded w-full" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
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
                    onDelete={removeIngredient}
                    ingredientOptions={ingredientOptions}
                    unitOptions={unitOptions}
                />
            ))}
            <button type="button" className="p-2 bg-gray-500 text-white rounded" onClick={() => setIngredients([...ingredients, { quantity: '', unit: 'grams', ingredientName: '' }])}>
                + Add Ingredient
            </button>

            <h3 className="text-xl font-semibold">Steps</h3>
            {steps.map((step, index) => (
                <StepInput key={index} step={step} index={index} onChange={handleStepChange} onDelete={removeStep} />
            ))}
            <button type="button" className="p-2 bg-gray-500 text-white rounded" onClick={() => setSteps([...steps, ''])}>
                + Add Step
            </button>

            <button type="submit" className="mt-4 p-2 bg-black text-white rounded w-full">Submit Recipe</button>
        </form>
    );
};
