import mongoose from "mongoose";
const SaleSchema = new mongoose.Schema({
  date: { type:String, unique:true }, // YYYY-MM-DD Date
  totalAmount: { type:Number, default:0 },
  billsGenerated: { type:Number, default:0 },
  productsSold: { type:Number, default:0 }
});
export default mongoose.model("Sale", SaleSchema); // logical structure for database
