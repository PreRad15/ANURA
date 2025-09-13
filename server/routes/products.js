import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// products search
router.get("/", async (req, res) => {
  const q = (req.query.search || "").trim();
  const filter = q
    ? {
        $or: [
          { itemNo: new RegExp(`^${q}`, "i") },
          { name: new RegExp(q, "i") },
        ],
      }
    : {};
  try {
    const docs = await Product.find(filter).sort({ name: 1 }).lean();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products.", error: err.message });
  }
});

// GET products: itemNo
router.get("/:itemNo", async (req, res) => {
  try {
    const p = await Product.findOne({ itemNo: String(req.params.itemNo) }).lean();
    if (!p) return res.status(404).json({ message: "Product not found." });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product.", error: err.message });
  }
});

// POST products bulk-add
router.post("/bulk-add", async (req, res) => {
  try {
    // The client sends { products: ___, } so we destructure 'products' from the body
    const { products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid input: 'products' array is required." });
    }

    // Using ordered: if false, it allows valid products to be inserted even if some are duplicates.
    const saved = await Product.insertMany(products, { ordered: false });
    res.status(201).json({ message: `${saved.length} products added successfully.`, data: saved });
  } catch (err) {
    // Mongoose throws a bulkWrite error for duplicates; we can handle it gracefully.
    if (err.code === 11000) {
        return res.status(409).json({ 
            message: "Some products could not be added due to duplicate Item Numbers.",
            error: err.message
        });
    }
    res.status(500).json({ message: "An error occurred while adding products.", error: err.message });
  }
});


// POST products bulk-remove
router.post("/bulk-remove", async (req, res) => {
  try {
    // The client sends { products: ___ }
    const { products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid input: 'products' array with item numbers is required." });
    }

    const itemNos = products.map(p => p.itemNo);
    const result = await Product.deleteMany({ itemNo: { $in: itemNos } });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "No matching products found to remove." });
    }

    res.json({ success: true, message: `${result.deletedCount} products removed.` });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while removing products.", error: err.message });
  }
});

export default router;