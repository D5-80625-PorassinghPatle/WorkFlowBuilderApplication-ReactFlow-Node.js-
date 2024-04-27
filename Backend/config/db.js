import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { VITE_MONGODB_URI } = process.env;

const connectToDatabase = async () => {
    try {
        // Connect to MongoDB using the URI
        await mongoose.connect(VITE_MONGODB_URI);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

export { connectToDatabase };
