export const fetchIngredients = async () => {
    const response = await fetch('http://localhost:3001/api/ingredient');
    const data = await response.json();
    return Array.isArray(data) ? data : data.ingredients;
};

export const fetchCategories = async () => {
    const response = await fetch('http://localhost:3001/api/category');
    const data = await response.json();
    return Array.isArray(data) ? data : data.categories;
};

export const submitRecipe = async (recipeData: any, token: string) => {
    const response = await fetch('http://localhost:3001/api/recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
    });
    return response.json();
};

export const updateRecipe = async (id: number, recipeData: any) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/api/recipe/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
        throw new Error("Failed to update recipe");
    }

    return response.json();
};
