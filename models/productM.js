import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  department: { type: Object, required: true },
  category: { type: Object, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
