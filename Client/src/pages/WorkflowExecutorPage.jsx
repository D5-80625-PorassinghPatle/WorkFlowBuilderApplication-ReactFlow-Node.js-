import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWorkflows, selectWorkflow } from "../redux/slices/workflowSlice";
import DataUploader from "../components/WorkflowExecutor/DataUploader";
import WorkflowSelector from "../components/WorkflowExecutor/WorkflowSelector";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WorkflowExecutorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadedData, setUploadedData] = useState(null);
  const workflows = useSelector((state) => state.workflow.workflows);
  const selectedWorkflowName = useSelector(
    (state) => state.workflow.selectedWorkflowName
  );
  const [executionMessage, setExecutionMessage] = useState(""); // Changed line
  // Fetch the list of workflows when the component mounts
  useEffect(() => {
    dispatch(fetchWorkflows());
  }, [dispatch]);

  const handleDataUpload = (data) => {
    setUploadedData(data);
  };

  const handleWorkflowSelect = (selectedWorkflow) => {
    // Extract the name from the selected workflow
    const workflowName = selectedWorkflow.name;

    // Dispatch the workflow name to the Redux store
    dispatch(selectWorkflow(workflowName));
  };

  const handleGoToWorkflowPage = () => {
    navigate("/builder");
  };

  const handleExecuteWorkflow = async () => {
    console.log("Selected Workflow Name:", selectedWorkflowName);
    console.log("Uploaded Data:", uploadedData);

    if (!selectedWorkflowName || !uploadedData) {
      console.error("Please select a workflow and upload data.");
      return;
    }

    try {
      // Prepare execution data
      const executionData = {
        data: uploadedData,
      };

      // Send a POST request to execute the workflow using the workflow name
      const response = await axios.post(
        `http://localhost:3000/api/workflows/${selectedWorkflowName}/execute`,
        executionData
      );

      // Handle the response
      console.log("Workflow executed successfully:", response.data);
    } catch (error) {
      console.error("Error executing workflow:", error);
    }
  };

  return (
    <div className="workflow-executor-page">
      <h1 className="heading">WORKFLOW EXECUTOR</h1>
      <h3 className="heading">Selected WorkFlow Name { selectedWorkflowName || " : no workflow selelcted"}</h3>
      <h4></h4>

      {executionMessage && (
        <div className="execution-message">{executionMessage}</div>
      )}{" "}
      {/* Changed line */}
      <div className="upload-container">
        <DataUploader onDataUpload={handleDataUpload} />
        <button className="choose-file-button">Choose File</button>
        <button className="upload-button">Upload</button>
      </div>
      <div className="dropdown-container">
        <WorkflowSelector
          workflows={workflows}
          onWorkflowSelect={handleWorkflowSelect}
        />
      </div>
      <button
        onClick={handleExecuteWorkflow}
        className="execute-workflow-button">
        Execute Workflow
      </button>
      <button
        onClick={handleGoToWorkflowPage}
        className="go-to-workflow-button"
        style={{ marginTop: "10px" }}>
        Go to Workflow Page
      </button>
    </div>
  );
};

// export default WorkflowExecutorPage;

// Define CSS for the component
const styles = `
.workflow-executor-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    background-color: #f5f7f9;
}

.heading {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    color: #333;
    margin-bottom: 40px;
    text-transform: uppercase;
}

.upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
    padding: 40px;
    margin-bottom: 20px;
    border-radius: 8px;
    width: 80%;
}

.choose-file-button, .upload-button {
    margin: 10px 0;
    padding: 12px 24px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

.choose-file-button:hover, .upload-button:hover {
    background-color: #0056b3;
}

.dropdown-container {
    margin-bottom: 20px;
    width: 80%;
}

.execute-workflow-button {
    padding: 12px 24px;
    font-size: 1.1rem;
    border: none;
    border-radius: 8px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
}

.execute-workflow-button:hover {
    background-color: #c82333;
}

.go-to-workflow-button {
    padding: 12px 24px;
    font-size: 1rem;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    margin-top: 10px;
}

.go-to-workflow-button:hover {
    background-color: #5a6268;
}
`;

// Append styles to the document head
const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default WorkflowExecutorPage;
