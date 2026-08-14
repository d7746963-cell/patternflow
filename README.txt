========================================
   ChartAnalyzer - Setup Instructions
========================================

STEP 1: Install Node.js
------------------------
Download and install Node.js from:
https://nodejs.org
(Click the big green LTS button, install it, restart your terminal)


STEP 2: Start the Backend
--------------------------
Open a terminal/command prompt and run:

   cd backend
   npm install
   npm start

You should see: "Server is running on port 5000"
Keep this terminal open!


STEP 3: Start the Frontend
---------------------------
Open a NEW terminal/command prompt and run:

   cd frontend
   npm install
   npm run dev

You should see a URL like: http://localhost:5173


STEP 4: Open the App
----------------------
Open your browser and go to:

   http://localhost:5173

That's it! The app is now running on your machine.


========================================
   IMPORTANT NOTES
========================================

- You need BOTH terminals running at the same time
  (one for backend, one for frontend)

- To stop the app, press Ctrl+C in both terminals

- Make sure nothing else is running on port 5000 or 5173

- The .env files contain API keys needed for the app
  to work. They are already included in this package.
