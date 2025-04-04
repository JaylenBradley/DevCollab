const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

// Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

// Creating one - 201 is a specific 200 response meaning successful creation
router.post('/', async (req, res) => {
    try {
        const {name, subscribedToChannel} = req.body;
        const subscriber = new Subscriber({name, subscribedToChannel});
        await subscriber.save()
        res.status(201).json(subscriber)
    } catch(err) {
        // 400 error is when the client fails (failed user input)
        res.status(400).json({message: err.message})
    }
})

// Updating one - patch only updates the data the user passes
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne();
        res.json({message: "Deleted subscriber"})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

// Middleware
async function getSubscriber(req, res, next) {
    let subscriber

    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber === null) {
            return res.status(404).json({message: "Can't find subscriber"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router