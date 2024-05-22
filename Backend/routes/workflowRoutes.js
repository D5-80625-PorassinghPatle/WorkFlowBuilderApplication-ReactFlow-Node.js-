import express from 'express';
import {
    createWorkflow,
    getWorkflows,
    getWorkflowByName,
    executeWorkflow,
} from '../controllers/workflowController.js'; // Import controller functions

// Create a router instance
const router = express.Router();



// POST /api/workflows: Create a new workflow
router.post('/', createWorkflow);

// GET /api/workflows: Retrieve all workflows
router.get('/', getWorkflows);

// GET /api/workflows/:workflowName: Retrieve a workflow by name
router.get('/:workflowName', getWorkflowByName);

// POST /api/workflows/:workflowName/execute: Execute a workflow by name
router.post('/:workflowName/execute', executeWorkflow);

// Export the router for use in the main application
export default router;
