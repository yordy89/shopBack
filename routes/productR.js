import express from "express";
import Product from "../controller/productC";

const router = express.Router();

router.post("/product", Product.addProduct);
router.get("/products", Product.getProducts);
router.delete("/product/:id", Product.deleteProduct);
router.put("/product/:id", Product.updateProduct);

module.exports = router;
