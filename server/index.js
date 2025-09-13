const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());            // for allowing frontend requests in dev
app.use(express.json());    // for parsing JSON request bodies

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// simple Item model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  qty:   { type: Number, default: 0 },
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);

// routes
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));

app.get("/api/items", async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

app.post("/api/items", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mount the products route
app.use("/api/products", productsRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected JSR"))
  .catch(err => console.error(err));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);


// start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("Mongo connection error:", err.message);
    process.exit(1);
  });

