import express from "express";
import Sale from "../models/Sale.js";
const router = express.Router();

// GET /sales- list recent
router.get("/", async (req,res)=>{
  const rows = await Sale.find().sort({ date:-1 }).limit(8).lean();
  res.json(rows);
});

export default router;
