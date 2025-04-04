const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

// Takes in the name of the model in the DB & the corresponding schema
module.exports = mongoose.model('Subscriber', subscriberSchema)