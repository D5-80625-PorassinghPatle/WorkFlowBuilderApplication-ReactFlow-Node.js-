import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import your custom node components
import FilterDataNode from '../nodes/FilterDataNode';
import ConvertFormatNode from '../nodes/ConvertFormatNode';
import WaitNode from '../nodes/WaitNode';
import SendPostRequestNode from '../nodes/SendPostRequestNode';

// Map your custom node types to the corresponding components
const nodeTypes = {
    filterData: FilterDataNode,
    convertFormat: ConvertFormatNode,
    wait: WaitNode,
    sendPostRequest: SendPostRequestNode,
};

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Start Node' },
        position: { x: 250, y: 5 },
    },
    {
        id: '100',
        type: 'output',
        data: { label: 'End Node' },
        position: { x: 250, y: 50 },
    },
];

let id = 1;
const getId = () => `node_${id++}`;

const WorkflowCanvas = ({ onElementsChange }) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [orderOfExecution, setOrderOfExecution] = useState([]); // Track order of execution

    // Handle connecting nodes
    const handleConnect = useCallback(
        (params) => {
            setEdges((prevEdges) => addEdge(params, prevEdges));
        },
        []
    );

    // Handle dropping nodes from the sidebar
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const nodeType = event.dataTransfer.getData('application/reactflow');
            if (!nodeType) {
                return;
            }

            // Convert screen coordinates to flow position using screenToFlowPosition
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            // Create a new node with the appropriate type and position
            const newNode = {
                id: getId(),
                type: nodeType,
                position,
                data: { label: `${nodeType} node` },
            };

            // Add the new node to the nodes state
            setNodes((prevNodes) => prevNodes.concat(newNode));

            // Update the order of execution array with the dropped node type
            setOrderOfExecution((prevOrder) => [...prevOrder, nodeType]);

            // Notify the parent component about the updated elements (nodes and edges)
            onElementsChange([...nodes, newNode], edges);
        },
        [reactFlowInstance, setNodes, nodes, edges, onElementsChange]
    );

    return (
        <ReactFlowProvider>
            <div
                ref={reactFlowWrapper}
                style={{ width: '100%', height: '100vh', border: '1px solid #ccc' }}
                onDrop={onDrop}
                onDragOver={(event) => event.preventDefault()}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={handleConnect}
                    onInit={setReactFlowInstance}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Controls />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    );
};

export default WorkflowCanvas;
