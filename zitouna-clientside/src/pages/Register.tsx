import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function Register(): JSX.Element {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', firstName: '', lastName: '', userName: '' });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            navigate('/login');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Register</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="First Name" className="block w-full p-2 border rounded" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                <input type="text" placeholder="Last Name" className="block w-full p-2 border rounded" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                <input type="text" placeholder="Username" className="block w-full p-2 border rounded" value={formData.userName} onChange={(e) => setFormData({ ...formData, userName: e.target.value })} />
                <input type="email" placeholder="Email" className="block w-full p-2 border rounded" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input type="password" placeholder="Password" className="block w-full p-2 border rounded" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <button type="submit" className="mt-4 p-2 bg-black text-white rounded w-full">Register</button>
            </form>
        </div>
    );
}
