const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    completed: { 
        type: Boolean, 
        default: false 
    }
}, { 
    timestamps: true,
    versionKey: false // Disable the version key
});

// Create a compound index for userId and title
taskSchema.index({ userId: 1, title: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
