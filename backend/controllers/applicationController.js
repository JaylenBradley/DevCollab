const Application = require('../models/application');
const Project = require('../models/project');
const User = require('../models/user');

exports.getApplications = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page-1) * limit;

    try {
        const totalDocs = await Application.countDocuments();
        const applications = await Application.find()
            .populate('project', 'name type owner') // will populate the referenceID attributes with the relevent data
            .populate('applicant', 'username email')
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(totalDocs/limit);

        res.status(200).json({
            data: applications,
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

exports.getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('project', 'name type owner')
            .populate('applicant', 'username email');
        if (application === null) {
            return res.status(400).json({message: 'Application not found'});
        }
        res.json(application);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.createApplication = async (req, res) => {
    try {
        const {project, applicant, message} = req.body;
        const projectDoc = await Project.findById(project);
        const userDoc = await User.findById(applicant);
        if (!projectDoc || !userDoc) {
            return res.status(400).json({message: 'Invalid parameters. User/Project Id is invalid.'});
        }
        const application = new Application({project, applicant, message});
        const newApplication = await application.save();
        res.status(201).json(newApplication);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Apllicant has already applied to this project.'})
        }
        res.status(500).json({message: err.message});
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if ( !['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({message: 'Invalid status. Must be pending, approved, or rejected'});
        }
        const application = await Application.findById(req.params.id);
        if (application === null) {
            return res.status(404).json({message: 'Application not found.'});
        }
        application.status = status;

        if (status === 'approved'){
            const project = await Project.findById(application.project);
            if (!project.teamMembers.includes(application.applicant)) {
                project.teamMembers.push(application.applicant);
                await project.save()
            }
        }

        const updatedApplication = await application.save();
        res.status(201).json(updatedApplication);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.getProjectApplications = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page-1) * limit;
    try {
        const projectId = req.params.id;
        const projectDoc = await Project.findById(projectId);
        if (!projectDoc){
            return res.status(404).json({message: 'Invalid parameters. Project was not found.'});
        }
        const totalDocs = await Application.countDocuments({project: projectId});
        const applications = await Application.find({project: projectId})
            .populate('applicant', 'username email') // only populate the user details
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(totalDocs/limit);
        
        res.status(200).json({
            data: applications,
            pagination: {
                totalDocs,
                limit,
                page,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getUserApplications = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page-1) * limit;
    try {
        const userId = req.params.id;
        const userDoc = await User.findById(userId);
        if (!userDoc) {
            return res.status(404).json({message: 'Invalid parameters. User was not found.'});
        }
        const totalDocs = await Application.countDocuments({applicant: userId});
        const applications = await Application.find({applicant: userId})
            .populate('project', 'name type status owner')
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(totalDocs/limit);
        
        
        res.status(200).json({
            data: applications,
            pagination: {
                totalDocs,
                limit,
                page,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};