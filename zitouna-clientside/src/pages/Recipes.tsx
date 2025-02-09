import { useEffect, useState } from "react";
import { Filters, SearchBar, SortButtons } from "../components/SearchBar";
import { RecipeCard } from "../components/RecipeCard";

export function Recipes(): JSX.Element {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [spicinessFilter, setSpicinessFilter] = useState("");
    const [sortBy, setSortBy] = useState<"alphabetical" | "prepTime" | null>(null);
    const [nameSortOrder, setNameSortOrder] = useState<"asc" | "desc" | null>(null);
    const [prepTimeSortOrder, setPrepTimeSortOrder] = useState<"asc" | "desc" | null>(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/recipe')
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data.recipes);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const categories = [...new Set(recipes.map((recipe) => recipe.category.name))];

    // Filter and sort recipes
    const filteredRecipes = recipes
        .filter((recipe) => {
            const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory ? recipe.category.name === selectedCategory : true;
            const matchesSpiciness = spicinessFilter ? recipe.spiciness === parseInt(spicinessFilter) : true;
            return matchesSearch && matchesCategory && matchesSpiciness;
        })
        .sort((a, b) => {
            if (sortBy === "alphabetical" && nameSortOrder) {
                return nameSortOrder === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (sortBy === "prepTime" && prepTimeSortOrder) {
                return prepTimeSortOrder === "asc"
                    ? a.prepTime - b.prepTime
                    : b.prepTime - a.prepTime;
            }
            return 0;
        });

    const handleSort = (type: "alphabetical" | "prepTime") => {
        if (type === "alphabetical") {
            if (sortBy === "alphabetical") {
                if (nameSortOrder === "asc") {
                    setNameSortOrder("desc");
                } else if (nameSortOrder === "desc") {
                    setSortBy(null);
                    setNameSortOrder(null);
                } else {
                    setNameSortOrder("asc");
                }
            } else {
                setSortBy("alphabetical");
                setNameSortOrder("asc");
                setPrepTimeSortOrder(null);
            }
        } else if (type === "prepTime") {
            if (sortBy === "prepTime") {
                if (prepTimeSortOrder === "asc") {
                    setPrepTimeSortOrder("desc");
                } else if (prepTimeSortOrder === "desc") {
                    setSortBy(null);
                    setPrepTimeSortOrder(null);
                } else {
                    setPrepTimeSortOrder("asc");
                }
            } else {
                setSortBy("prepTime");
                setPrepTimeSortOrder("asc");
                setNameSortOrder(null);
            }
        }
    };

    if (loading) {
        return <div className="p-6 text-center text-xl">Loading recipes...</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Search and Filters Section */}
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: "#1b2b50" }}>
                <div className="flex flex-wrap gap-4 items-center">
                    <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                    <Filters
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        spicinessFilter={spicinessFilter}
                        onSpicinessChange={setSpicinessFilter}
                    />
                    <SortButtons
                        sortBy={sortBy}
                        nameSortOrder={nameSortOrder}
                        prepTimeSortOrder={prepTimeSortOrder}
                        onSort={handleSort}
                    />
                </div>
            </div>

            {/* Recipes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}