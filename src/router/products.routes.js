import express from "express";
import * as productsController from "../controllers/products.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getProduct);

router.post("/create", authentication, productsController.addProduct);

router.put("/update/:id", authentication, productsController.updateProduct);

router.delete("/:id", authentication, productsController.deleteProduct);

export default router;
