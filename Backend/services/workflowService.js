import Workflow from "../models/Workflow.js";
import { parse } from "csv-parse/sync";
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


// Function to introduce delay (Wait node)
const wait = async (duration = 6000) => {
  console.log("Starting timeout...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Timeout completed.");
      resolve();
    }, duration);
  });
};

// Function to convert format (Convert Format node)
const convertFormat = (inputData) => {
    try {
      // Ensure inputData is provided and is not empty
      if (!inputData || !inputData.data) {
        throw new Error("CSV data is required");
      }
  
      // Parse the CSV data (inputData) to JSON format
      const data = inputData.data;
      const rows = data.split("\r\n");
      const headers = rows[0].split(",");
      const result = rows.slice(1).map((row) => {
        const values = row.split(",");
        const jsonRow = {};
        headers.forEach((header, index) => {
          jsonRow[header] = values[index];
        });
        return jsonRow;
      });
  
      console.log("convertFormat done");
  
      // Convert the array of objects to JSON format
      const jsonData = JSON.stringify(result);
      return jsonData;
    } catch (error) {
      // Log the error
      console.error("Error converting CSV to JSON:", error.message);
      // Throw the error to be handled by the calling function
      throw error;
    }
  };
  

const sendPostRequest = async (data) => {
  try {
    // Attempt to parse the data as JSON
    const jsonData = JSON.parse(data);

    // Send the JSON array as the payload in a POST request
    const response = await fetch("https://myreactglow.requestcatcher.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    // Check the Content-Type header to determine the response format
    const contentType = response.headers.get("Content-Type");

    // If the response is JSON, parse and return it
  } catch (error) {
    throw new Error(" Sendpost req node : Data must be in JSON format");
  }
};

// Function map
const functionsMap = {
  filterData: (currentData) =>
    filterData(currentData.elementData, currentData.data),
  wait: async (currentData) => {
    await wait();
    return "Wait completed";
  },
  convertFormat: (currentData) => convertFormat(currentData),
  sendPostRequest: async (currentData) => await sendPostRequest(currentData),
};

// Function to execute a workflow by name
// const executeWorkflowService = async (name, inputData) => {
//     console.log('Executing workflow with name:', name);

//     // Retrieve the workflow by its name
//     const workflow = await Workflow.findOne({ name });

//     console.log('Workflow retrieved:', workflow);

//     // If no workflow is found, throw an error
//     if (!workflow) {
//         throw new Error('Workflow not found');
//     }

//     // Initialize the currentData with inputData
//     let currentData = inputData;

//     // Iterate through the order of execution and execute each function
//     const executionResults = [];

//     for (const functionName of workflow.orderOfExecution) {
//         const func = functionsMap[functionName];
//         if (typeof func === "function") {
//             currentData = await func(currentData);
//             executionResults.push(currentData);
//         } else {
//             throw new Error(`Unknown function name: ${functionName}`);
//         }
//     }

//     return executionResults;
// };

// Function to execute a workflow by name
const executeWorkflowService = async (name, inputData) => {
  console.log("Executing workflow with name:", name);

  // Retrieve the workflow by its name
  const workflow = await Workflow.findOne({ name });

  console.log("Workflow retrieved:", workflow);

  // If no workflow is found, throw an error
  if (!workflow) {
    throw new Error("Workflow not found");
  }

  // Initialize the currentData with inputData
  let currentData = inputData;

  // Iterate through the order of execution and execute each function
  const executionResults = [];
  let convertFormatOutput = null; // Store the output of convertFormat

  for (const functionName of workflow.orderOfExecution) {
    const func = functionsMap[functionName];
    console.log(func);

    if (typeof func === "function") {
      // If convertFormat has already executed and sendPostRequest is next
      if (functionName === "sendPostRequest" && convertFormatOutput !== null) {
        // Override currentData with convertFormat's output
        currentData = convertFormatOutput;
      }
      currentData = await func(currentData);
      executionResults.push(currentData);
      // If the current function executed is convertFormat, store its output
      if (functionName === "convertFormat") {
        convertFormatOutput = currentData;
        console.log(convertFormatOutput);
      }
    } else {
      throw new Error(`Unknown function name: ${functionName}`);
    }
  }

  return executionResults ;
};

export default {
  createWorkflowService,
  getWorkflowsService,
  getWorkflowByNameService,
  executeWorkflowService,
};
