import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { RecipeDetail } from "./pages/RecipeDetail";
import { AddRecipe } from "./pages/AddRecipe";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import {useState} from "react";
import {EditRecipe} from "./pages/EditRecipe.tsx";
import {Recipes} from "./pages/Recipes.tsx";

export default function App(): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/edit-recipe/:id" element={<EditRecipe />} />

      </Routes>
      <Footer />
    </Router>
  );
}
