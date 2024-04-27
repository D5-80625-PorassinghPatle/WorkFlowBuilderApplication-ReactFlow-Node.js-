import React from 'react';
import { Handle } from 'reactflow';

const NodeComponent = ({ data, isConnectable }) => {
  // Define your node appearance and behavior here
  return (
    <div className="node">
      <div className="node-header">
        <strong>{data.label}</strong>
      </div>
      <div className="node-content">
        {/* Add any specific content for the node */}
        {data.content}
      </div>
      {/* Add input and output handles for connecting nodes */}
      <Handle type="source" position="right" isConnectable={isConnectable} />
      <Handle type="target" position="left" isConnectable={isConnectable} />
    </div>
  );
};

export default NodeComponent;
