const Order = require("../models/Order");
const SubOrder = require("../models/SubOrder");
const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.adminRevenuePerVendor = async (req, res) => {
  const revenue = await SubOrder.aggregate([
    { $match: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
    { $group: { _id: "$vendorId", totalRevenue: { $sum: "$total" } } }
  ]);
  res.json(revenue);
};

exports.adminTopProducts = async (req, res) => {
  const top = await SubOrder.aggregate([
    { $unwind: "$products" },
    { $group: { _id: "$products.productId", count: { $sum: "$products.quantity" } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.json(top);
};

exports.adminAvgOrderValue = async (req, res) => {
  const avg = await Order.aggregate([
    { $group: { _id: null, avgValue: { $avg: "$totalAmount" } } }
  ]);
  res.json(avg[0] || { avgValue: 0 });
};

exports.vendorDailySales = async (req, res) => {
  const vendorId = req.user._id;
  const sales = await SubOrder.aggregate([
    { $match: { vendorId: new mongoose.Types.ObjectId(vendorId) } },
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, total: { $sum: "$total" } } },
    { $sort: { _id: 1 } }
  ]);
  res.json(sales);
};

exports.vendorLowStock = async (req, res) => {
  const vendorId = req.user._id;
  const lowStock = await Product.find({ vendorId, stock: { $lt: 5 } });
  res.json(lowStock);
};
