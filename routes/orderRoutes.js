const router = require("express").Router();
const auth = require("../middleware/auth");
const orderController = require("../controllers/orderController");

router.post("/", auth, orderController.placeOrder);

module.exports = router;
