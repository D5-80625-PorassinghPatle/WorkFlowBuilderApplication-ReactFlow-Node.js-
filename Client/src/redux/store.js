import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from './slices/workflowSlice';

const store = configureStore({
  reducer: {
    workflow: workflowReducer, // Add the workflow reducer to the store
  },
  
});

export default store;
