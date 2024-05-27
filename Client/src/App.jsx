import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorkflowBuilderPage from "./pages/WorkflowBuilderPage";
import WorkflowExecutorPage from "./pages/WorkflowExecutorPage";
import "./styles/global.css"; // Import global styles

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/builder" element={<WorkflowBuilderPage />} />
          <Route path="/executor" element={<WorkflowExecutorPage />} />
          <Route path="/" element={<WorkflowBuilderPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
