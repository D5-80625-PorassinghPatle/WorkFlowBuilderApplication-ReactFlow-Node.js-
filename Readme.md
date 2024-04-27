# Project: React Flow Builder

## Table of Contents
- [Demo Video](#demo-video)
- [Images](#images)
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Packages](#packages)
- [Functionalities](#functionalities)
- [Folder Structure](#folder-structure)
- [Important Points](#important-points)
- [How to Run the Project](#how-to-run-the-project)

## Demo Video
*Add the link to the demo video here.*

## Images
*Add images of the project here.*

## Project Overview

The React Flow Builder project is a comprehensive workflow builder and executor application that allows users to create, save, and execute workflows using a React front-end with Redux for state management and a Node.js/MongoDB back-end. Users can design workflows using custom nodes and save them for later execution with uploaded data.

## Technologies Used

- **Frontend**:
    - [React](https://react.dev/)
    - [Redux](https://redux.js.org/)
    - [React Flow](https://reactflow.dev/)
    - [Axios](https://axios-http.com/)
- **Backend**:
    - [Node.js](https://nodejs.org/)
    - [Express](https://expressjs.com/)
    - [MongoDB](https://www.mongodb.com/)

## Packages

- `react`: For building the front-end user interface.
- `redux` and `@reduxjs/toolkit`: For state management in the front-end.
- `axios`: For making HTTP requests from the front-end to the back-end.
- `reactflow`: For creating custom flow diagrams in the front-end.
- `express`: For building the back-end RESTful API.
- `mongoose`: For interfacing with the MongoDB database.
- `csv-parse/sync`: For parsing CSV data in the back-end.

## Functionalities

- **Workflow Builder**:
    - Design workflows using custom nodes (e.g., filter data, wait, convert format, send POST request).
    - Save workflows with a name and order of execution.
- **Workflow Executor**:
    - Upload data (e.g., CSV files) for workflow execution.
    - Select a saved workflow for execution.
    - Execute workflows with uploaded data and view the results in the console.
- **Nodes**:
    - **Filter Data Node**: Filters specified columns to lowercase or uppercase.
    - **Wait Node**: Introduces a delay during workflow execution.
    - **Convert Format Node**: Converts data format (e.g., CSV to JSON).
    - **Send POST Request Node**: Transmits generated JSON payloads to a predefined URL.

## Folder Structure

- `src/`
    - `components/`: Contains React components (e.g., WorkflowCanvas, DataUploader, etc.).
    - `redux/`: Contains Redux slices and store configuration.
    - `pages/`: Contains React pages (e.g., WorkflowBuilderPage, WorkflowExecutorPage).
    - `services/`: Contains back-end service functions.
    - `models/`: Contains MongoDB models.
    - `controllers/`: Contains back-end controller functions.
    - `routes/`: Contains Express route definitions.
- `public/`: Contains static assets.
- `node_modules/`: Contains installed dependencies.

## Important Points

- The project utilizes React Flow for building custom workflows in the front-end.
- The back-end uses Express and MongoDB for API and data storage, respectively.
- The Redux state management helps maintain application state and manage data flow between components.
- The project involves converting data formats, handling workflows, and executing them with uploaded data.
- Custom nodes (e.g., FilterDataNode, ConvertFormatNode) allow for versatile workflow design.

## How to Run the Project

1. **Clone the Repository**: Clone the project repository to your local machine.
    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the Project Directory**: Change to the project's root directory.
    ```bash
    cd <project_directory>
    ```

3. **Install Dependencies**: Install the necessary packages using npm or yarn.
    ```bash
    npm install
    ```

4. **Start the Backend Server**: Navigate to the `Backend` directory and start the server.
    ```bash
    cd Backend
    node server.js
    ```

5. **Start the Frontend**: Navigate to the `Frontend` directory and start the React application.
    ```bash
    cd Frontend
    npm start
    ```

6. **Access the Application**: Once both servers are running, access the application in your browser at `http://localhost:3000/`.

Enjoy exploring and using the React Flow Builder project!