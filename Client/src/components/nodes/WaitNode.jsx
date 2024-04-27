import React from 'react';
import { Handle } from 'reactflow';
import './node.css';


const WaitNode = ({ isConnectable }) => {
  return (
    <div className="node-style">
      <div className="node-header">
       
      </div>
      <div className="node-content">
        <p>60-second delay</p>
      </div>
      <Handle type="source" position="right" isConnectable={isConnectable} />
      <Handle type="target" position="left" isConnectable={isConnectable} />
    </div>
  );
};

export default WaitNode;
