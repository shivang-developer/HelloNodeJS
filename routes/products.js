const express = require("express");
const router = express.Router();

const { getAllProducts, addNewProduct } = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/").post(addNewProduct);

module.exports = router;
