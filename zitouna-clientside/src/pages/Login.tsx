import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export function Login({ setIsAuthenticated }: { setIsAuthenticated: (auth: boolean) => void }): JSX.Element {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginData = { email, password };

        try {
            const response = await fetch('http://localhost:3001/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('Invalid login credentials');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" placeholder="Email" className="block w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="block w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="mt-4 p-2 bg-black text-white rounded w-full">Login</button>
            </form>
            <p className="mt-4 text-center">Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link></p>
        </div>
    );
}
