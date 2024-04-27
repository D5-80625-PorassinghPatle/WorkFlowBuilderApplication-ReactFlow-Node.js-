import app from "./app.js";
import { connectToDatabase } from './config/db.js';
import { config } from "dotenv";

import cors from "cors"; // CORS middleware

config();
app.use(cors()); // Enable CORS

connectToDatabase()

const PORT = process.env.PORT || 3003;

// Start the Express server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});