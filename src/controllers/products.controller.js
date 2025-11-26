import * as productsService from "../services/products.service.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log(id);
    //Se valida que id no sea espacios en blanco ya que de faltar el id entra en la ruta api/products/ listando todos los productos
    if (id.trim() === "") {
      throw new BadRequestError("No se proporciono Id");
    }
    const product = await productsService.getProductById(id);
    // console.log(product);
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError("Falta el cuerpo en la solicitud");
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
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id.trim() === "") {
      throw new BadRequestError("No se proporciono Id");
    } else if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError("Falta el cuerpo en la solicitud");
    }
    const { name, price, category } = req.body;

    const updateProduct = await productsService.updateProduct({
      id,
      name,
      price,
      category,
    });

    return res
      .status(200)
      .json({ message: "Producto actualizado", product: updateProduct });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id.trim() === "") {
      throw new BadRequestError("No se proporciono Id");
    }

    const deletedProduct = await productsService.deleteProduct(id);

    return res.status(200).json({
      message: "Producto eliminado correctamente",
      deletedProduct,
    });
  } catch (err) {
    next(err)
  }
};
