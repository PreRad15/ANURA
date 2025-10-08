
# Anura Store Management

ANURA is a full-stack web application designed to provide small retailers and supermart owners with a simple, user-friendly, and reliable system for managing their store's inventory, billing, and sales reporting.



## Features

- Inventory Management
- Billing System
- Sales Reporting
- Responsive Design


## Tech Stack
**Full Stack JavaScript Architecture**

**Frontend:** React+Vite, Bootstrap.

**Backend:** Node, Express.

**Database:** MongoDb local hosting.


## Installation
**You will need the following software installed on your machine:**

**Node.js** (which includes npm)

**MongoDB**

*Clone the repository*

```bash
  git clone [https://github.com/PreRad15/ANURA.git](https://github.com/PreRad15/ANURA.git)
cd ANURA
```
*Set up the Backend Server.*

*Navigate to the server directory.*

```bash
  cd server
Install the required npm packages:
npm install
```
*Create a .env file in the server directory and add your MongoDB connection string*

MONGO_URI=mongodb://127.0.0.1:27017/anura_store
PORT=5000

*Set up the Frontend Client.*

*From the root directory, navigate to the client directory*

```bash
  cd ../client
Install the required npm packages:
npm install
```

## Running Application

*To run the application, You will need to run the backend and frontend in two separate terminals. And run the following command.*

Backend/Server Terminal command.
```bash
  npm run dev
```

**The server should now be running on http://localhost:5000.**


Frontend/client Terminal command.
```bash
  npm run dev
```
The application will open automatically in your browser at http://localhost:5173 (or another available port).

You can now use the ANURA application in your browser.
## License

[MIT](https://acrobat.adobe.com/id/urn:aaid:sc:AP:2c30e56d-0013-49e6-a710-1163c3ef883a)


## How to use the application

First let's add a product:

Click on **Inventory** tab.

Click on **Add product** button in green colour.

Fill in the product deatils like item no., Name, Price, Quantity.

Click on add product.

A pop up will appear: product added succesfully.

Now let create a bill:

Go to **Home** page by clicking on back button.

Click on **New Bill** tab.
 
Add product by selecting from the drop-down list.

Ckick on **Generate bill**

Bill will be generated.

Let' check Today's sale.

Click on **Sale Report** tab

All the bill generated today will be shown and total sale will also be mentioned.