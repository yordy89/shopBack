import express from "express";
import Category from "../controller/categoryC";

const router = express.Router();

router.post("/category", Category.addCategory);
router.get("/categories", Category.getCategories);
router.delete("/category/:id", Category.deleteCategory);
router.put("/category/:id", Category.updateCategory);

module.exports = router;
