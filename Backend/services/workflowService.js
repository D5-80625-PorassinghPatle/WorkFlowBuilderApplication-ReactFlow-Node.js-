import Workflow from "../models/Workflow.js";
import axios from "axios";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";

// Function to create a new workflow
const createWorkflowService = async (name, orderOfExecution, columnName) => {
  try {
    const newWorkflow = new Workflow({ name, orderOfExecution, columnName });
    await newWorkflow.save();
    return newWorkflow;
  } catch (error) {
    console.error("Error creating workflow:", error.message);
    throw error;
  }
};

// Function to get all workflows
const getWorkflowsService = async () => {
  try {
    return await Workflow.find({});
  } catch (error) {
    console.error("Error getting workflows:", error.message);
    throw error;
  }
};

// Function to get a single workflow by name
const getWorkflowByNameService = async (name) => {
  try {
    return await Workflow.findOne({ name });
  } catch (error) {
    console.error("Error getting workflow by name:", error.message);
    throw error;
  }
};

// Function to introduce delay (Wait node)
const wait = async (duration = 6000) => {
  console.log("Starting timeout...");
  await new Promise((resolve) => setTimeout(resolve, duration));
  console.log("Timeout completed.");
  return "Wait completed";
};

// Function to filter CSV data
const filterData = async (input, columnName) => {
  try {
    // Ensure input is an object and has the 'data' property
    if (typeof input !== "object" || !input.hasOwnProperty("data")) {
      throw new Error(
        "Input must be an object with a 'data' property containing the CSV string"
      );
    }

    const data = input.data;

    // Ensure the 'data' property is a string
    if (typeof data !== "string") {
      throw new Error("The 'data' property must be a CSV string");
    }

    // Parse the CSV data
    const parsedData = parse(data, {
      columns: true,
      skip_empty_lines: true,
    });

    // Check if the specified column exists
    if (!parsedData[0].hasOwnProperty(columnName)) {
      throw new Error(`Column '${columnName}' not found in CSV data`);
    }

    // Convert the specified column's data to uppercase
    parsedData.forEach((row) => {
      row[columnName] = row[columnName].toUpperCase();
    });

    // Convert the modified data back to a CSV string
    const modifiedCsvData = stringify(parsedData, { header: true });

    console.log(modifiedCsvData);
    return modifiedCsvData;
  } catch (error) {
    console.error("Error filtering data:", error.message);
    throw error;
  }
};

// Function to convert CSV data to JSON format
const convertFormat = async (inputData) => {
  try {
    let data;

    // Check if inputData is an object with a 'data' property
    if (typeof inputData === 'object' && inputData.hasOwnProperty('data')) {
      data = inputData.data;
    } else if (typeof inputData === 'string') {
      data = inputData; // inputData is already the CSV string
    } else {
      throw new Error('Invalid input format. Expected an object with a "data" property or a CSV string.');
    }

    // Ensure CSV data is provided and is not empty
    if (!data) {
      throw new Error("CSV data is required");
    }

    // Parse the CSV data to JSON format
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
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    // Log the error
    console.error("Error converting CSV to JSON:", error.message);
    // Throw the error to be handled by the calling function
    throw error;
  }
};

// Function to send a POST request with JSON data
const sendPostRequest = async (data) => {
  try {
    // Attempt to parse the data as JSON
    const jsonData = JSON.parse(data);

    // Send the JSON array as the payload in a POST request
    await axios.post(
      "https://myreactglow.requestcatcher.com",
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
  } catch (error) {
    console.error("Error sending POST request:", error.message);
    throw new Error("SendPostRequest: Data must be in JSON format");
  }
};

// Function mapping
const functionsMap = {
  filterData: async (currentData, columnName) => await filterData(currentData, columnName),
  convertFormat: async (currentData) => await convertFormat(currentData),
  sendPostRequest: async (currentData) => await sendPostRequest(currentData),
  wait: async () => await wait(),
};

// Function to execute a workflow by name
const executeWorkflowService = async (name, inputData) => {
  console.log("Executing workflow with name:", name);

  try {
    // Retrieve the workflow by its name
    const workflow = await getWorkflowByNameService(name);
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

      if (typeof func === "function") {
        // Pass columnName for filterData
        if (functionName === "filterData") {
          currentData = await func(currentData, workflow.columnName);
        } else {
          // If convertFormat has already executed and sendPostRequest is next
          if (
            functionName === "sendPostRequest" &&
            convertFormatOutput !== null
          ) {
            currentData = convertFormatOutput;
          }
          currentData = await func(currentData);
        }

        executionResults.push(currentData);

        // If the current function executed is convertFormat, store its output
        if (functionName === "convertFormat") {
          convertFormatOutput = currentData;
        }
      } else {
        throw new Error(`Unknown function name: ${functionName}`);
      }
    }

    return executionResults;
  } catch (error) {
    console.error("Error executing workflow:", error.message);
    throw error;
  }
};

export default {
  createWorkflowService,
  getWorkflowsService,
  getWorkflowByNameService,
  executeWorkflowService,
};
