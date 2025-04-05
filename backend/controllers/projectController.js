const Project = require('../models/project');

exports.getProjects = async (req, res) => {
    try {
        const project = await Project.find();
        res.json(project);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.getProject = async (req, res) => {
    try {
        const project =  await Project.findById(req.params.id);
        if (project === null) {
            return res.status(400).json({message: err.message});
        }
        res.json(project);

    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.createProject = async (req, res) => {
    try {
        //Need to change owner to come from uid (auth), but can leave from req.body for testing purposes
        const {name, description, type, status, skills, owner} = req.body;
        const project = new Project({name, description, type, status, skills, owner});
        await project.save();
        res.status(201).json(project);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project =  await Project.findById(req.params.id);
        if (project === null) {
            return res.status(400).json({message: err.message});
        }

        if (req.body.name != null) {
            project.name = req.body.name;
        }
        if (req.body.description != null) {
            project.description = req.body.description;
        }
        if (req.body.type != null) {
            project.type = req.body.type;
        }
        if (req.body.status != null) {
            project.status = req.body.status;
        }
        if (req.body.skills != null) {
            project.skills = req.body.skills;
        }
        if (req.body.teamMembers != null) {
            project.teamMembers = req.body.teamMembers;
        }

        const updatedProject = await project.save();
        res.json(updatedProject);

    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project =  await Project.findById(req.params.id);
        if (project === null) {
            return res.status(400).json({message: err.message});
        }
        await project.deleteOne();
        res.json({message: 'Project successfully deleted'})

    } catch(err) {
        res.status(500).json({message: err.message});
    }
};