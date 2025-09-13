import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  itemNo: { type:String, unique:true, required:true },
  name: { type:String, required:true },
  qty: { type:Number, required:true, min:0 },
  price: { type:Number, required:true, min:0 }
});
export default mongoose.model("Product", ProductSchema); // Logical structur for database
