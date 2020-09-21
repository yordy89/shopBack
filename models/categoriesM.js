import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const CatgoriesSchema = new Schema({
  name: { type: String, required: true },
  department: { type: Object, required: true, default: { name: "zapatos" } },
});

module.exports = mongoose.model("Categories", CatgoriesSchema);
