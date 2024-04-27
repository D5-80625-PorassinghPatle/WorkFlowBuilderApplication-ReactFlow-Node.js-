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
        updateWorkflow: (state, action) => {
            // Update an existing workflow in the array
            const index = state.workflows.findIndex(
                (workflow) => workflow.id === action.payload.id
            );
            if (index !== -1) {
                state.workflows[index] = action.payload;
            }
        },
        deleteWorkflow: (state, action) => {
            // Remove a workflow from the array by its ID
            state.workflows = state.workflows.filter(
                (workflow) => workflow.id !== action.payload
            );
        },
        selectWorkflow: (state, action) => {
            // Set the selected workflow name
            state.selectedWorkflowName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkflows.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWorkflows.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.workflows = action.payload; // Store fetched workflows
            })
            .addCase(fetchWorkflows.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Store error message
            });
    },
});

export const {
    addWorkflow,
    updateWorkflow,
    deleteWorkflow,
    selectWorkflow,
} = workflowSlice.actions;

export default workflowSlice.reducer;
