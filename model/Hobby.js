const mongoose = require('mongoose');

const MSchema = mongoose.Schema;

const hobbySchema = new MSchema({
    title: String,
    description: String,
    userId: String
})

module.exports = mongoose.model('Hobby', hobbySchema);

// { id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '211' }

