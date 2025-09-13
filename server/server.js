import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import products from "./routes/products.js";
import bills from "./routes/bills.js";
import sales from "./routes/sales.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", products);
app.use("/api/bills", bills);
app.use("/api/sales", sales);

// DB + Start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("Mongo connected successfully");
  app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
}).catch(err=>console.error(err));
