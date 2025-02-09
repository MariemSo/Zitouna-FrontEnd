import { Link, useLocation } from "react-router-dom";

export function Navbar({ isAuthenticated, onLogout }: { isAuthenticated: boolean; onLogout: () => void }): JSX.Element {
    const location = useLocation();

    const getNavLinkClass = (path: string) =>
        location.pathname === path ? "text-[#922D50] font-bold border-b-2 border-[#922D50] pb-1" : "hover:text-gray-500";

    return (
        <nav className="p-4 bg-white shadow-md flex justify-between items-center">
            <div className="text-xl font-bold">Zitouna</div>
            <ul className="flex space-x-4">
                <li><Link to="/" className={getNavLinkClass("/")}>Home</Link></li>
                <li><Link to="/recipes" className={getNavLinkClass("/recipes")}>Recipes</Link></li>
                {isAuthenticated && <li><Link to="/add-recipe" className={getNavLinkClass("/add-recipe")}>Add Recipe</Link></li>}
                <li><Link to="/contact" className={getNavLinkClass("/contact")}>Contact</Link></li>
                <li><Link to="/about" className={getNavLinkClass("/about")}>About</Link></li>
            </ul>
            <div>
                {isAuthenticated ? (
                    <button onClick={onLogout} style={{ backgroundColor: "#922D50" }} className="px-4 py-2 text-white rounded-md">Logout</button>
                ) : (
                    <Link to="/login" className="px-4 py-2 bg-black text-white rounded-md mr-2">Login</Link>
                )}
            </div>
        </nav>
    );
}
