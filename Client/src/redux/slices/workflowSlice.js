import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous action to fetch workflows from the backend
export const fetchWorkflows = createAsyncThunk(
    'workflow/fetchWorkflows',
    async () => {
        const response = await axios.get('http://localhost:3000/api/workflows');
        return response.data;
    }
);

const initialState = {
    workflows: [], // Array to hold all workflows
    selectedWorkflowName: null, // Name of the selected workflow
    status: 'idle', // Status of fetch request (idle, loading, succeeded, failed)
    error: null, // Error message for failed requests
};

const workflowSlice = createSlice({
    name: 'workflow',
    initialState,
    reducers: {
        addWorkflow: (state, action) => {
            // Add a new workflow to the array
            state.workflows.push(action.payload);
        },
       
        selectWorkflow: (state, action) => {
            // Set the selected workflow name
            state.selectedWorkflowName = action.payload;
        },
    },
});

export const {
    addWorkflow,
    selectWorkflow,
} = workflowSlice.actions;

export default workflowSlice.reducer;
