import workflowService from '../services/workflowService.js'; // Import workflow service

// Function to handle creating a new workflow
const createWorkflow = async (req, res) => {
    try {
        const { name, orderOfExecution,columnName } = req.body;

        const columnToSave = columnName || 'defaultColumnValue';

        // Call the service function to create a new workflow
        const newWorkflow = await workflowService.createWorkflowService(name, orderOfExecution,columnToSave);

        // Send a response with the created workflow
        res.status(201).json(newWorkflow);
    } catch (error) {
        console.error('Error creating workflow:', error);
        res.status(500).json({ error: 'Failed to create workflow' });
    }
};

// Function to handle fetching all workflows
const getWorkflows = async (req, res) => {
    try {
        // Call the service function to get all workflows
        const workflows = await workflowService.getWorkflowsService();

        // Send a response with the retrieved workflows
        res.status(200).json(workflows);
    } catch (error) {
        console.error('Error fetching workflows:', error);
        res.status(500).json({ error: 'Failed to fetch workflows' });
    }
};

// Function to handle fetching a workflow by ID
const getWorkflowById = async (req, res) => {
    try {
        const { workflowId } = req.params;

        // Call the service function to get the workflow by ID
        const workflow = await workflowService.getWorkflowByIdService(workflowId);

        if (workflow) {
            res.status(200).json(workflow);
        } else {
            res.status(404).json({ error: 'Workflow not found' });
        }
    } catch (error) {
        console.error('Error fetching workflow by ID:', error);
        res.status(500).json({ error: 'Failed to fetch workflow' });
    }
};

// Function to handle fetching a workflow by name
const getWorkflowByName = async (req, res) => {
    try {
        const { workflowName } = req.params;

        // Call the service function to get the workflow by name
        const workflow = await workflowService.getWorkflowByNameService(workflowName);

        if (workflow) {
            res.status(200).json(workflow);
        } else {
            res.status(404).json({ error: 'Workflow not found' });
        }
    } catch (error) {
        console.error('Error fetching workflow by name:', error);
        res.status(500).json({ error: 'Failed to fetch workflow' });
    }
};

// Function to handle executing a workflow by ID
// Update the function to use the correct parameter (name)
const executeWorkflow = async (req, res) => {
    try {
        const { workflowName } = req.params; // Retrieve the workflow name from the request
        const inputData = req.body; // Get the input data

        // Call the service function to execute the workflow using the workflow name
        const executionResults = await workflowService.executeWorkflowService(workflowName, inputData);

        res.status(200).json(executionResults);

        

    } catch (error) {
        console.error('Error executing workflow:', error);
        res.status(500).json({ error: 'Failed to execute workflow ' + error});
        
    }
};


// Export the controller functions
export {
    createWorkflow,
    getWorkflows,
    getWorkflowById,
    getWorkflowByName,
    executeWorkflow,
};
