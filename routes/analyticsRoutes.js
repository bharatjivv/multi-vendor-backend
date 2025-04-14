const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/roles");
const ac = require("../controllers/analyticsController");

router.get("/admin/revenue", auth, role("admin"), ac.adminRevenuePerVendor);
router.get("/admin/top-products", auth, role("admin"), ac.adminTopProducts);
router.get("/admin/avg-order", auth, role("admin"), ac.adminAvgOrderValue);

router.get("/vendor/daily-sales", auth, role("vendor"), ac.vendorDailySales);
router.get("/vendor/low-stock", auth, role("vendor"), ac.vendorLowStock);

module.exports = router;
