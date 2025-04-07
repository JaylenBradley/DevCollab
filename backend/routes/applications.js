const express = require('express');
const {
    getApplications,
    getApplication,
    createApplication,
    updateApplicationStatus,
    getProjectApplications,
    getUserApplications
} = require('../controllers/applicationController');

const router = express.Router();

// base application routes
router.get('/', getApplications);
router.get('/:id', getApplication);
router.post('/', createApplication);
router.patch('/:id', updateApplicationStatus);

// special routes
router.get('/project/:id', getProjectApplications);
router.get('/user/:id', getUserApplications);

module.exports = router;