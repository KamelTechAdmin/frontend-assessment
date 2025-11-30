## Technologies Used

## Frontend

-React.js
-TypeScript
-Tailwind CSS
-Framer Motion
-Lucide Icons

## State Management

-Jotai and React State Management for:

Active tab
Full-screen toggling
Shared message state (before moving to API)
UI controls (timeline toggle)
Rich Text Editing

-Plate.js to build the reply text editor with:

Toolbar
Basic formatting
Controlled editor state

## API Layer

-Axios – Configured Axios instance for all API requests.

## React Query for data fetching and caching:

-Fetching tabs
-Fetching messages
-Mutations (create, update, delete)

## Mock API

-json-server used as a fake backend during development:
-/tabs for ticket tabs
-/messages for messages per tab

## Note

Before running the project, make sure to start the fake API server first.
=> npm run server
Then start the React app.
=> npm run dev
