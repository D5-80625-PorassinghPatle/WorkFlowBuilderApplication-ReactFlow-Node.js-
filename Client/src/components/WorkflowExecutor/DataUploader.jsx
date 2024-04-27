import React, { useState } from 'react';

const DataUploader = ({ onDataUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileContent = fileReader.result;
        onDataUpload(fileContent); // Call the function to handle data upload
      };
      fileReader.readAsText(selectedFile);
    }
  };

  return (
    <div className="data-uploader">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
};

export default DataUploader;
