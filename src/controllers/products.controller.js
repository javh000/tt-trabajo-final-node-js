import * as productsService from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Controller error:", error.message);

    if (error.message === "No hay productos") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    //Se valida que id no sea espacios en blanco ya que de faltar el id entra en la ruta api/products/ listando todos los productos
    if (id.trim() === "") {
      throw new Error("No se proporciono Id");
    }
    const product = await productsService.getProductById(id);
    // console.log(product);
    return res.status(200).json(product);
  } catch (error) {
    if (error.message === "Producto no encontrado") {
      return res.status(404).json({ error: error.message });
    } else if (error.message === "No se proporciono Id") {
      return res.status(400).json({ error: error.message });
    }

    console.error("Controller error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Falta el cuerpo en la solicitud");
    }
    const { name, price, category } = req.body;
    const newProduct = await productsService.addProduct({
      name,
      price,
      category,
    });

    return res
      .status(201)
      .json({ message: "Producto creado", product: newProduct });
  } catch (error) {
    if (error.message === "Faltan campos obligatorios") {
      return res.status(400).json({ error: error.message });
    } else if (error.message === "Falta el cuerpo en la solicitud") {
      return res.status(400).json(error.message);
    }
    console.error("Controller error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (id.trim() === "") {
      throw new Error("No se proporciono Id");
    }

    const deletedProduct = await productsService.deleteProduct(id);

    return res.status(200).json({
      message: "Producto eliminado correctamente",
      deletedProduct,
    });
  } catch (error) {
    if (error.message === "Error. No se encontró el producto a eliminar") {
      return res.status(404).json(error.message);
    } else if (error.message === "No se proporciono Id") {
      return res.status(400).json({ error: error.message });
    }

    console.log("Controller error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
