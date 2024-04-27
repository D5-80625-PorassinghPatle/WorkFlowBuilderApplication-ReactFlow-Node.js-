  import React from 'react';

  const WorkflowSelector = ({ workflows = [], onWorkflowSelect }) => {
    const handleChange = (event) => {
      const selectedWorkflowName = event.target.value;
  
      // Find the selected workflow in the list of workflows
      const selectedWorkflow = workflows.find(
          (workflow) => workflow.name === selectedWorkflowName
      );
  
      // Log the selected workflow to the console
      console.log('Selected Workflow:', selectedWorkflow);
  
      // If a workflow is found, pass the entire selectedWorkflow object to onWorkflowSelect
      if (selectedWorkflow) {
          onWorkflowSelect(selectedWorkflow);
      } else {
          console.log('No workflow selected');
      }
  };
  

      return (
          <div className="workflow-selector">
              <label htmlFor="workflow-select">Select Workflow:</label>
              <select id="workflow-select" onChange={handleChange}>
                  <option value="">--Choose a workflow--</option>
                  {workflows.map((workflow) => (
                      <option key={workflow.name} value={workflow.name}>
                          {workflow.name}
                      </option>
                  ))}
              </select>
          </div>
      );
  };

  export default WorkflowSelector;
