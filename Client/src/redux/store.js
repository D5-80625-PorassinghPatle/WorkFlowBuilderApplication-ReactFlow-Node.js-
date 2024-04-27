import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from './slices/workflowSlice';

const store = configureStore({
  reducer: {
    workflow: workflowReducer, // Add the workflow reducer to the store
  },
  // Add any middleware if needed (e.g., for asynchronous actions)
});

export default store;
