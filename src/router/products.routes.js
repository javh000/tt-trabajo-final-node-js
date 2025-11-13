import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Todos los productos");
});

router.get("/:id", (req, res) => {
  res.json("Producto");
});

router.post("/create", (req, res) => {
  res.json("Producto creado");
});

router.delete("/:id", (req, res) => {
  res.json("Producto borrado");
});

export default router;
