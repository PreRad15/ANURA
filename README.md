ANURA - Store Management System
ANURA is a full-stack web application designed to provide small retailers and supermart owners with a simple, user-friendly, and reliable system for managing their store's inventory, billing, and sales reporting.

Features
Inventory Management: Easily add, remove, and view all products in the store's inventory. Includes a search function to quickly find items.

Billing System: A dynamic billing page to create new customer bills. Select products from inventory, adjust quantities, and automatically calculate the total price.

Sales Reporting: View a summary of sales data, including total sales, number of bills generated, and products sold per day.

Responsive Design: The user interface is fully responsive and accessible on desktops, tablets, and mobile devices.

Technology Stack
The application is built with a modern, full-stack JavaScript architecture:

Frontend:

React.js (with Vite)

Bootstrap for responsive UI components.

React Router for client-side navigation.

Backend:

Node.js

Express.js for creating the RESTful API.

Database:

MongoDB (with Mongoose) for data persistence.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You will need the following software installed on your machine:

Node.js (which includes npm)

MongoDB

Installation & Setup
Clone the repository:

git clone [https://github.com/PreRad15/ANURA.git](https://github.com/PreRad15/ANURA.git)
cd ANURA

Set up the Backend Server:

Navigate to the server directory:

cd server

Install the required npm packages:

npm install

Create a .env file in the server directory and add your MongoDB connection string:

MONGO_URI=mongodb://127.0.0.1:27017/anura_store
PORT=5000

Set up the Frontend Client:

From the root directory, navigate to the client directory:

cd ../client

Install the required npm packages:

npm install

Running the Application
You will need to run the backend and frontend in two separate terminals.

Start the Backend Server:

In your terminal, from the server directory, run:

npm run dev

The server should now be running on http://localhost:5000.

Start the Frontend Client:

In a new terminal, from the client directory, run:

npm run dev

The application will open automatically in your browser at http://localhost:5173 (or another available port).

You can now use the ANURA application in your browser.