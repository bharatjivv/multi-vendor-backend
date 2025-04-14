const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
  subOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubOrder" }]
});

module.exports = mongoose.model("Order", orderSchema);
