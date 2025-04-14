const mongoose = require("mongoose");

const subOrderSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("SubOrder", subOrderSchema);
