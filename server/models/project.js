const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    department: { type: String },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const Project = mongoose.model('project', projectSchema);
module.exports = Project;
