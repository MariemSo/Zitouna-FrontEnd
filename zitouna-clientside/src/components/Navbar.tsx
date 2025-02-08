import { Link } from "react-router-dom";

export function Navbar({ isAuthenticated, onLogout }: { isAuthenticated: boolean; onLogout: () => void }): JSX.Element {
    return (
        <nav className="p-4 bg-white shadow-md flex justify-between items-center">
            <div className="text-xl font-bold">Zitouna</div>
            <ul className="flex space-x-4">
                <li><Link to="/" className="hover:text-gray-500">Home</Link></li>
                <li><Link to="/recipes" className="hover:text-gray-500">Recipes</Link></li>
                {isAuthenticated && <li><Link to="/add-recipe" className="hover:text-gray-500">Add Recipe</Link></li>}
                <li><Link to="/contact" className="hover:text-gray-500">Contact</Link></li>
                <li><Link to="/about" className="hover:text-gray-500">About</Link></li>
            </ul>
            <div>
                {isAuthenticated ? (
                    <button onClick={onLogout} style={{ backgroundColor: "#922D50" }}  className="px-4 py-2 text-white rounded-md">Logout</button>
                ) : (
                        <Link to="/login" className="px-4 py-2 bg-black text-white rounded-md mr-2">Login</Link>
                )}
            </div>
        </nav>
    );
}
