import express from "express";
import mongoose from "mongoose"; 
import Product from "../models/Product.js";
import Bill from "../models/Bill.js";
import Sale from "../models/Sale.js";

const router = express.Router();
const TAX = 0.07; // Tax feature

function fmtDate(d) { return d.toISOString().slice(0, 10); }

// POST api bill generation
router.post("/", async (req, res) => {
    try {
        const itemsReq = req.body.items || [];
        if (itemsReq.length === 0) {
            return res.status(400).json({ message: "Cannot create an empty bill." });
        }

        const billItems = [];
        let total = 0;
        let productCount = 0;

        // Validate all items and calculate totals before making any database changes.
        for (const it of itemsReq) {
            const p = await Product.findOne({ itemNo: String(it.itemNo) });
            if (!p) {
                return res.status(404).json({ message: `Item with number '${it.itemNo}' not found.` });
            }
            if (p.qty < it.qty) {
                return res.status(400).json({ message: `Not enough stock for '${p.name}'. Available: ${p.qty}, Requested: ${it.qty}.` });
            }
            
            total += p.price * it.qty;
            productCount += it.qty;
            billItems.push({ itemNo: p.itemNo, name: p.name, price: p.price, qty: it.qty });
        }
        
        // If all validations passed, update the product quantities in the database.
        for (const it of itemsReq) {
             await Product.updateOne(
                { itemNo: String(it.itemNo) },
                { $inc: { qty: -it.qty } }
            );
        }

        // Create the bill document.
        const tax = total * TAX;
        const grandTotal = total + tax;
        const last = await Bill.findOne().sort({ number: -1 });
        const number = (last?.number || 1503) + 1; // Start bill numbers from 1504
        const bill = await Bill.create({ number, items: billItems, total, tax, grandTotal });

        // Update the daily sales report.
        const dateKey = fmtDate(bill.date);
        await Sale.updateOne(
            { date: dateKey },
            { 
                $inc: { 
                    totalAmount: grandTotal, 
                    billsGenerated: 1, 
                    productsSold: productCount 
                } 
            },
            { upsert: true } // Tis create a new sales report for the day
        );

        res.status(201).json(bill);

    } catch (err) {
        console.error("Error creating bill:", err);
        res.status(500).json({ message: "An unexpected error occurred on the server while creating the bill." });
    }
});

// GET bills id
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;