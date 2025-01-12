import { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks, selectedTask, setSelectedTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title);
            setDescription(selectedTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [selectedTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Title is required');
            return;
        }
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login first');
                return;
            }

            const config = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            
            const taskData = { 
                title: title.trim(),
                description: description.trim()
            };

            if (selectedTask) {
                await axios.put(
                    `http://localhost:5000/api/tasks/${selectedTask._id}`,
                    taskData,
                    config
                );
                setSelectedTask(null);
            } else {
                await axios.post('http://localhost:5000/api/tasks', taskData, config);
            }
            
            setTitle('');
            setDescription('');
            fetchTasks();
        } catch (error) {
            console.error('Error submitting task:', error.response?.data || error.message);
            alert(`Error submitting task: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded shadow-md">
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
            <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded shadow transition duration-300"
            >
                {selectedTask ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;
