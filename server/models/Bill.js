import mongoose from "mongoose";
const BillItemSchema = new mongoose.Schema({
  itemNo: String, name: String, price: Number, qty: Number
},{ _id:false });

const BillSchema = new mongoose.Schema({
  number: Number,
  items: [BillItemSchema],
  total: Number,
  tax: Number,
  grandTotal: Number,
  date: { type: Date, default: Date.now }
});
export default mongoose.model("Bill", BillSchema);// Logical structur for database
