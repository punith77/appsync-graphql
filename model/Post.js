const mongoose = require('mongoose');

const MSchema = mongoose.Schema;

const postSchema = new MSchema({
    comment: String,
    userId: String
})

module.exports = mongoose.model('Post', postSchema);

//  { id: '1', comment: 'Building a Mind', userId: '1' },