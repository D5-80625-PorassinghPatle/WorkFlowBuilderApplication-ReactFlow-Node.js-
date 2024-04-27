import React from 'react';
import { Handle } from 'reactflow';
import './node.css';

const ConvertFormatNode = ({ isConnectable }) => {
  return (
    <div className="node-style">
      <div className="node-header">
       
      </div>
      <div className="node-content">
        <p>CSV to JSON</p>
      </div>
      <Handle type="source" position="right" isConnectable={isConnectable} />
      <Handle type="target" position="left" isConnectable={isConnectable} />
    </div>
  );
};

export default ConvertFormatNode;
