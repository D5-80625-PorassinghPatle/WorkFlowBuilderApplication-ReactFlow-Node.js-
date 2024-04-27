const FilterDataNode = ({ data, isConnectable }) => {
  const [column, setColumn] = useState(data.column || '');

  // Handler for updating the column name
  const handleColumnChange = (event) => {
      const newColumn = event.target.value;
      setColumn(newColumn);
      data.column = newColumn; // Update the data object with the new column name
  };

  return (
      <div className="node-style">
          <div className="node-header">
              <label>Column to lowercase:</label>
          </div>
          <div className="node-content">
              <input type="text" value={column} onChange={handleColumnChange} />
          </div>
          <Handle type="source" position="right" isConnectable={isConnectable} />
          <Handle type="target" position="left" isConnectable={isConnectable} />
      </div>
  );
};

export default FilterDataNode;
