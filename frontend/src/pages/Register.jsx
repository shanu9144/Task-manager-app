import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password,
            });
            if (res.data) {
                alert('Registration successful! Please log in.');
                navigate('/login'); // Redirect to the login page
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">Register</h1>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full p-2 border rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
                <p className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 underline">
                        Login here
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
