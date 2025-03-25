const mongoose = require('mongoose');

const userAttributeSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attributes: { type: Object, required: true }
});

const UserAttribute = mongoose.model('userattribute', userAttributeSchema);
module.exports = UserAttribute;


