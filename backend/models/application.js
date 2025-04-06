const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId, // specifies that we are storing a document ID
        ref: 'Project', // specifying that it is a document in the 'Project' schema
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // likewise here
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Creating a coumpound index and ensuring each user can apply to a project once and once only
applicationSchema.index({ project: 1, applicant: 1}, { unique: true});

module.exports = mongoose.model('Application', applicationSchema);