import Workflow from '../models/Workflow.js';
import { parse } from 'csv-parse/sync';
// import { parse as csvParse } from 'csv-parse/sync'; // Import the sync version of the CSV parsing library


// Function to create a new workflow
const createWorkflowService = async (name, orderOfExecution) => {
    // Create a new workflow document
    const newWorkflow = new Workflow({
        name,
        orderOfExecution,
    });

    // Save the new workflow to the database
    await newWorkflow.save();

    // Return the created workflow
    return newWorkflow;
};

// Function to get all workflows
const getWorkflowsService = async () => {
    // Retrieve all workflows from the database
    return await Workflow.find({});
};

// Function to get a single workflow by name
const getWorkflowByNameService = async (name) => {
    // Retrieve a workflow by its name
    return await Workflow.findOne({ name });
};

// Function to update a workflow by name
const updateWorkflowService = async (name, newName, orderOfExecution) => {
    // Update a workflow document by its name
    return await Workflow.findOneAndUpdate(
        { name },
        { name: newName, orderOfExecution },
        { new: true } // Return the updated document
    );
};

// Function to delete a workflow by name
const deleteWorkflowService = async (name) => {
    // Delete a workflow document by its name
    return await Workflow.findOneAndDelete({ name });
};

// Define functions for the element types (implement as needed)

// Function to filter data (Filter Data node)
import { parse as csvParse } from 'csv-parse/sync'; // Import the sync version of the CSV parsing library

const filterData = (elementData, data) => {
    // Parse the CSV data into an array of objects
    console.log(elementData);
    console.log(data);
    let parsedData;
    try {
        parsedData = csvParse(data, {
            columns: true, // Parse columns to objects
            skip_empty_lines: true, // Skip empty lines
        });
    } catch (error) {
        throw new Error('Failed to parse CSV data');
    }

    // Check if parsed data is an array
    if (!Array.isArray(parsedData)) {
        throw new TypeError('Data is not in the expected array format.');
    }

    // Filter data and convert the specified column to lowercase
    const filteredData = parsedData.map(row => {
        const filteredRow = { ...row };
        const columnKey = elementData.column; // The column specified in elementData

        // Convert the specified column to lowercase
        if (filteredRow[columnKey]) {
            filteredRow[columnKey] = filteredRow[columnKey].toLowerCase();
        }

        return filteredRow;
    });

    // Log the filtered data to the console
    console.log('Filtered Data:', filteredData);

    // Return the filtered data
    return filteredData;
};


// Function to introduce delay (Wait node)
const wait = async (duration = 60000) => {
    console.log('Starting timeout...');
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Timeout completed.');
            resolve();
        }, duration);
    });
};

// Function to convert format (Convert Format node)
const convertFormat = (inputData) => {
    // Parse the CSV data (inputData) to JSON format
    const data = inputData.data;
    const rows = data.split('\r\n');
    const headers = rows[0].split(',');
    const result = rows.slice(1).map(row => {
        const values = row.split(',');
        const jsonRow = {};
        headers.forEach((header, index) => {
            jsonRow[header] = values[index];
        });
        return jsonRow;
    });
    
    console.log("convertFormat done");
    return result;
};

// Function to send POST request (Send POST Request node)
const sendPostRequest = async (data) => {
    // Parse the CSV data into a JSON array
    const records = parse(data.data, {
        columns: true,
        skip_empty_lines: true,
    });

    // Send the JSON array as the payload in a POST request
    const response = await fetch("https://myreactglow.requestcatcher.com", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(records),
    });

    // Check the Content-Type header to determine the response format
    const contentType = response.headers.get('Content-Type');

    // If the response is JSON, parse and return it
 
};

// Function to execute a workflow by name
const executeWorkflowService = async (name, inputData) => {
    console.log('Executing workflow with name:', name);
    //console.log(inputData);

    // Retrieve the workflow by its name
    const workflow = await Workflow.findOne({ name });

    console.log('Workflow retrieved:', workflow);

    // If no workflow is found, throw an error
    if (!workflow) {
        throw new Error('Workflow not found');
    }

    // Iterate through the order of execution and execute each function
    const executionResults = [];

    // Iterate through the order of execution
    for (const functionName of workflow.orderOfExecution) {
        switch (functionName) {
            case 'filterData':
                const filteredData = filterData(inputData);
                executionResults.push(filteredData);
                break;

            case 'wait':
                await wait();
                executionResults.push('Wait completed');
                break;

            case 'convertFormat':
                const convertedData = convertFormat(inputData);
                executionResults.push(convertedData);
                break;

            case 'sendPostRequest':
                const postResponse = await sendPostRequest(inputData);
                executionResults.push(postResponse);
                break;

            default:
                throw new Error(`Unknown element type: ${functionName}`);
        }
    }

    return executionResults;
};




export default {
    createWorkflowService,
    getWorkflowsService,
    getWorkflowByNameService,
    updateWorkflowService,
    deleteWorkflowService,
    executeWorkflowService,
};