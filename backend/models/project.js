const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Web Development', 'Mobile App', 'Machine Learning', 'Other'],
        required: true
    },
    status: {
        type: String,
        enum: ['inactive', 'active', 'in-progress', 'completed'],
        required: true
    },
    skills: {
        type: [String],
        required: true

    },
    owner: {
        type: String,
        ref: 'User',
        required: true
    },
    teamMembers: [{
        type: String,
        ref: 'User'
    }],
});

module.exports = mongoose.model('Project', projectSchema)