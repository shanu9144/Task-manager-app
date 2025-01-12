/* eslint-disable react/prop-types */
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks, setSelectedTask }) => {
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, 
            { headers: { Authorization: `Bearer ${token}` } });
            fetchTasks();
        } catch (error) {
            alert('Error deleting task');
        }
    };

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task._id} className="p-4 border rounded shadow-md bg-white">
                    <h3 className="text-2xl font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <div className="space-x-4 mt-4">
                        <button
                            onClick={() => setSelectedTask(task)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition duration-300"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(task._id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
