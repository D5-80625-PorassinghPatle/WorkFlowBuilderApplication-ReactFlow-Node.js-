import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWorkflow } from "../redux/slices/workflowSlice";
import WorkflowCanvas from "../components/WorkflowBuilder/WorkflowCanvas";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const WorkflowBuilderPage = () => {
 // const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [elements, setElements] = useState([]);
  const [orderOfExecution, setOrderOfExecution] = useState([]); // State to track order of execution
  const [workflowName, setWorkflowName] = useState("");

  const handleElementsChange = (newElements, newEdges) => {
    setElements(newElements);

    // Update the order of execution based on the elements in sequence
    const order = newElements
        // Filter out initial nodes (e.g., "Start Node" and "End Node")
        .filter((element) => element.type !== 'input' && element.type !== 'output')
        // Map to the types of the nodes
        .map((element) => element.type);

    setOrderOfExecution(order);
};


  const handleSaveWorkflow = async () => {
    try {
      // Define the workflow data to be saved
      const workflowData = {
        name: workflowName,
        orderOfExecution, // Use order of execution state variable
      };

      // Send a POST request to save the workflow data to the backend
      const response = await axios.post("http://localhost:3000/api/workflows", workflowData);

      // Handle the response
      console.log("Workflow saved:", response.data);
    } catch (error) {
      console.error("Error saving workflow:", error);
    }
  };

  // Function to navigate to the execution page
  const handleGoToExecutionPage = () => {
    navigate("/executor"); // Navigate to the execution page
  };

  return (
    <div className="workflow-builder-page">
      {/* Left side for canvas */}
      <div className="canvas-container">
        <WorkflowCanvas
          elements={elements}
          onElementsChange={handleElementsChange}
          onConnect={handleElementsChange}
          onSetOrderOfExecution={setOrderOfExecution} // Pass setOrderOfExecution function to child component
        />
      </div>

      {/* Right side for sidebar, heading, input textbox, and save button */}
      <div className="sidebar-container">
        {/* Heading and input textbox */}
        <h1>Workflow Builder</h1>
        <input
          type="text"
          placeholder="Workflow Name"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          className="workflow-name-input"
        />

        {/* Sidebar for custom nodes */}
        <div className="sidebar">
          <div
            className="node-option"
            onDragStart={(event) => event.dataTransfer.setData("application/reactflow", "filterData")}
            draggable>
            Filter Data Node
          </div>
          <div
            className="node-option"
            onDragStart={(event) => event.dataTransfer.setData("application/reactflow", "convertFormat")}
            draggable>
            Convert Format Node
          </div>
          <div
            className="node-option"
            onDragStart={(event) => event.dataTransfer.setData("application/reactflow", "wait")}
            draggable>
            Wait Node
          </div>
          <div
            className="node-option"
            onDragStart={(event) => event.dataTransfer.setData("application/reactflow", "sendPostRequest")}
            draggable>
            Send Post Request Node
          </div>
        </div>

        {/* Save Workflow Button */}
        <button onClick={handleSaveWorkflow} className="save-workflow-button">
          Save Workflow
        </button>

        {/* New button to go to the execution page */}
        <button
          onClick={handleGoToExecutionPage}
          className="save-workflow-button"
          style={{ marginTop: "10px" }}>
          Go to Execution Page
        </button>
      </div>
    </div>
  );
};

// Define CSS for the component
const styles = `
.workflow-builder-page {
    display: flex;
    height: 100vh;
    width: 100vw;
}

.canvas-container {
    width: 70%;
    height: 100%;
    border-right: 1px solid #ccc;
}

.sidebar-container {
    width: 30%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
}

.workflow-name-input {
    margin-bottom: 10px;
    padding: 8px;
    width: 90%;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.sidebar {
    width: 100%;
    overflow-y: auto;
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.node-option {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    cursor: move;
    text-align: center;
}

.save-workflow-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

.save-workflow-button:hover {
    background-color: #0056b3;
}
`;

// Append styles to the document head
const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);
export default WorkflowBuilderPage;
