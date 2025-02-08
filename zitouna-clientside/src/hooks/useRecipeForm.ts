import { useState, useEffect } from 'react';
import { fetchIngredients, fetchCategories } from '../services/apiService';

export const useRecipeForm = () => {
    const [name, setName] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [prepTime, setPrepTime] = useState(10);
    const [spiciness, setSpiciness] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [categoryOptions, setCategoryOptions] = useState<{ id: number; name: string }[]>([]);
    const [ingredients, setIngredients] = useState([{ quantity: '', unit: '', ingredientName: '' }]);
    const [steps, setSteps] = useState(['']);
    const [ingredientOptions, setIngredientOptions] = useState<{ id: number; name: string }[]>([]);
    const [unitOptions] = useState(["grams", "milliliters", "cups", "tablespoons", "teaspoons", "pieces"]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const ingredients = await fetchIngredients();
                const categories = await fetchCategories();
                setIngredientOptions(ingredients.sort((a, b) => a.name.localeCompare(b.name)));
                setCategoryOptions(categories);
            } catch (err) {
                console.error("Error loading data:", err);
            }
        };
        loadData();
    }, []);

    return {
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
        setError,
    };
};