const mongoose = require('mongoose');

const projectAttributeSchema = mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  attributes: { type: Object, required: true }
});

const ProjectAttribute = mongoose.model('projectattribute', projectAttributeSchema);
module.exports = ProjectAttribute;


