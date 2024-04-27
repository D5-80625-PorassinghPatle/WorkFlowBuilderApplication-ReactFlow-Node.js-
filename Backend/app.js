import express from "express";
import morgan from "morgan"; // Logging middleware
import cors from "cors"; // CORS middleware
import helmet from "helmet"; // Security middleware
import workflowRoutes from "./routes/workflowRoutes.js"; // Import workflow routes
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(cors()); // Enable CORS

// Middleware configuration
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Set security-related HTTP headers
app.use(morgan("dev")); // Log HTTP requests in development mode

// Register workflow routes
app.use("/api/workflows", workflowRoutes);

// Proxy requests to /api to the backend
import proxy from '../proxy.js';
app.use('/api', proxy);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An unexpected error occurred" });
});

export default app;