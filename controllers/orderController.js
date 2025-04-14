const mongoose = require("mongoose");
const Order = require("../models/Order");
const SubOrder = require("../models/SubOrder");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const items = req.body.items; // { productId, quantity }
    const customerId = req.user._id;

    const vendorMap = {};
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product || product.stock < item.quantity) {
        throw new Error(\`Insufficient stock for \${product?.name || item.productId}\`);
      }
      product.stock -= item.quantity;
      await product.save({ session });

      const vendorId = product.vendorId.toString();
      if (!vendorMap[vendorId]) vendorMap[vendorId] = [];
      vendorMap[vendorId].push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price
      });
      totalAmount += product.price * item.quantity;
    }

    const subOrderIds = [];
    for (const vendorId in vendorMap) {
      const products = vendorMap[vendorId];
      const total = products.reduce((sum, p) => sum + p.quantity * p.price, 0);
      const subOrder = new SubOrder({ vendorId, products, total });
      await subOrder.save({ session });
      subOrderIds.push(subOrder._id);
    }

    const order = new Order({ customerId, totalAmount, subOrders: subOrderIds });
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: err.message });
  }
};
