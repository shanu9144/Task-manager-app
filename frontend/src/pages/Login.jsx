import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Add error state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            console.log('Attempting login with:', { email }); // Debug log
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email: email.trim(),
                password: password.trim()
            });

            console.log('Login response:', res.data); // Debug log

            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/');
            } else {
                setError('Invalid response from server');
            }
        } catch (error) {
            console.error('Login error details:', error.response?.data); // Debug log
            setError(error.response?.data?.message || 'Failed to login. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
                {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded shadow transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
