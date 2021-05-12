const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  img: [{ type: Buffer, contentType: String }],
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  old_price: { type: Number },
  price: { type: Number, required: true },
  num_in_stock: { type: Number, required: true },
  how_to_use: { type: String },
  features: [{ type: String }],
  ingredients: { type: String },
  bestselling: { type: Boolean },
  online: { type: Boolean },
});

module.exports = mongoose.model("Product", ProductSchema);
