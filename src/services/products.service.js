import * as productsModel from "../models/products.model.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";


export const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  if (products.length === 0) {
    throw new NotFoundError("No hay productos");
  }
  return products;
};

export const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);

  if (!product) {
    throw new NotFoundError("Producto no encontrado");
  }
  return product;
};

export const addProduct = async ({ name, price, category }) => {
  if (!name || !price || !category) {
    throw new BadRequestError("Faltan campos obligatorios");
  }
  return await productsModel.saveProduct({ name, price, category });
};

export const updateProduct = async ({ id, name, price, category }) => {
  if (!id || !name || !price || !category) {
    throw new BadRequestError("Faltan campos obligatorios");
  }
  const updateProduct = await productsModel.updateProduct({
    id,
    name,
    price,
    category,
  });

  if (!updateProduct) {
    throw new NotFoundError("Error. No se encontró el producto para actualizar");
  }
  return updateProduct;
};

export const deleteProduct = async (id) => {
  const deletedProduct = await productsModel.deleteProduct(id);
  if (!deletedProduct) {
    throw new NotFoundError("Error. No se encontró el producto a eliminar");
  }

  return deletedProduct;
};
