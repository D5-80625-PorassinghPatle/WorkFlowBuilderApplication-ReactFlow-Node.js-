import express from 'express';
import {
    createWorkflow,
    getWorkflows,
    getWorkflowByName,
    updateWorkflow,
    deleteWorkflow,
    executeWorkflow,
} from '../controllers/workflowController.js'; // Import controller functions

// Create a router instance
const router = express.Router();

// Define routes for workflow-related endpoints

// POST /api/workflows: Create a new workflow
router.post('/', createWorkflow);

// GET /api/workflows: Retrieve all workflows
router.get('/', getWorkflows);

// GET /api/workflows/:workflowName: Retrieve a workflow by name
router.get('/:workflowName', getWorkflowByName);

// PUT /api/workflows/:workflowName: Update a workflow by name
router.put('/:workflowName', updateWorkflow);

// DELETE /api/workflows/:workflowName: Delete a workflow by name
router.delete('/:workflowName', deleteWorkflow);

// POST /api/workflows/:workflowName/execute: Execute a workflow by name
router.post('/:workflowName/execute', executeWorkflow);

// Export the router for use in the main application
export default router;
