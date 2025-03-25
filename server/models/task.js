const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
  },
  { timestamps: true }
);

const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;
