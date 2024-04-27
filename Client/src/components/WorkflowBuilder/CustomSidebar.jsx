import React from 'react';

const Sidebar = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    // CSS styles for the Sidebar component
    const sidebarStyles = {
        sidebar: {
            padding: '15px 10px',
            borderRight: '1px solid #eee',
            background: '#fcfcfc',
            fontSize: '12px',
            height: '100%',
            overflowY: 'auto',
        },
        description: {
            marginBottom: '10px',
        },
        nodeOption: {
            height: '20px',
            padding: '4px',
            border: '1px solid #1a192b',
            borderRadius: '2px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'grab',
        },
    };

    return (
        <aside style={sidebarStyles.sidebar}>
            <div style={sidebarStyles.description}>You can drag these nodes to the canvas.</div>
            <div
                style={sidebarStyles.nodeOption}
                onDragStart={(event) => onDragStart(event, 'filterData')}
                draggable
            >
                Filter Data Node
            </div>
            <div
                style={sidebarStyles.nodeOption}
                onDragStart={(event) => onDragStart(event, 'convertFormat')}
                draggable
            >
                Convert Format Node
            </div>
            <div
                style={sidebarStyles.nodeOption}
                onDragStart={(event) => onDragStart(event, 'wait')}
                draggable
            >
                Wait Node
            </div>
            <div
                style={sidebarStyles.nodeOption}
                onDragStart={(event) => onDragStart(event, 'sendPostRequest')}
                draggable
            >
                Send Post Request Node
            </div>
        </aside>
    );
};

export default Sidebar;
