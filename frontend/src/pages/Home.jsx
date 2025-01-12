import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [user, setUser] = useState(null); // State to store user information
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            const res = await axios.get('https://task-manager-app-k08x.onrender.com/api/tasks', 
            { headers: { Authorization: `Bearer ${token}` } });
            setTasks(res.data);
        } catch (error) {
            alert('Error fetching tasks');
        }
    };

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            const res = await axios.get('http://localhost:5000/api/auth/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data) {
                setUser(res.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    useEffect(() => {
        fetchTasks();
        fetchUser();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Task Manager</h1>
            <div className="mb-8 flex justify-center space-x-4">
                {!user ? (
                    <>
                        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow transition duration-300">
                            Login
                        </Link>
                        <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow transition duration-300">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="text-xl">Welcome, {user.username}!</div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded shadow transition duration-300"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
            {user && (
                <div className="bg-white p-6 rounded shadow-md">
                    <TaskForm
                        fetchTasks={fetchTasks}
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                    />
                    <TaskList tasks={tasks} fetchTasks={fetchTasks} setSelectedTask={setSelectedTask} />
                </div>
            )}
        </div>
    );
};

export default Home;
