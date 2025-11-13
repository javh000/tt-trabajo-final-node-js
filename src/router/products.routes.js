import express from "express";
import * as productsController from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getProduct);

router.post("/create", productsController.addProduct);

router.delete("/:id", productsController.deleteProduct);

export default router;
