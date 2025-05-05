const User = require('../models/user');

exports.getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const totalDocs = await User.countDocuments();
        const users = await User.find()
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(totalDocs / limit);

        res.status(200).json({
            data: users,
            pagination: {
                totalDocs,
                limit,
                page,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user === null) {
            return res.status(400).json({message: err.message});
        }
        res.json(user);

    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.createUser = async (req, res) => {
    try {
        const {uid, username, email, password, profilePicture} = req.body;
        const user = new User({uid, username, email, password, profilePicture});
        await user.save();
        res.status(201).json(user);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user === null) {
            return res.status(400).json({message: err.message});
        }

        if (req.body.username != null) {
            user.username = req.body.username;
        }
        if (req.body.email != null) {
            user.email = req.body.email;
        }
        if (req.body.password != null) {
            user.password = req.body.password;
        }
        if (req.body.profilePicture != null) {
            user.profilePicture = req.body.profilePicture;
        }

        const updatedUser = await user.save();
        res.json(updatedUser);

    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user === null) {
            return res.status(400).json({message: err.message});
        }
        await user.deleteOne();
        res.json({message: "User successfully deleted"});

    } catch(err) {
        res.status(500).json({message: err.message});
    }
};