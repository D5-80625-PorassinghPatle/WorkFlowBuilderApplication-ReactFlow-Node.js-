import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define the schema for workflow data
const workflowSchema = new mongoose.Schema({
    workflowId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        default: uuidv4, // Automatically generate a unique UUID for each document
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    orderOfExecution: {
        type: [String], // Store an array of strings representing the names of the nodes in the sequence
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set to current date and time
    },
    columnname: {
        type: String,
        required: false,
        trim: false,
    },
    
    
});

// Create the Workflow model using the schema
const Workflow = mongoose.model('Workflow', workflowSchema);

// Export the model for use in other parts of the application
export default Workflow;
