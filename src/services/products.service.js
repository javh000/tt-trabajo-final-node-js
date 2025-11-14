let data = [
  { id: 1, name: "Producto 1", price: 1000 },
  { id: 2, name: "Producto 2", price: 2000 },
];

const DB = async () => {
  const fail = false;

  if (fail) {
    throw new Error("No se pudo conectar con la base de datos");
  }

  return data;
};

export const getAllProducts = async () => {
  const products = await DB();
  if (products.length === 0) {
    throw new Error("No hay productos");
  }
  return products;
};

export const getProductById = async (id) => {
  const products = await DB();

  const product = products.find((product) => product.id == id);
  console.log(product);

  if (!product) {
    throw new Error("Producto no encontrado");
  }
  return product;
};

export const addProduct = async ({ name, price }) => {
  //   console.log(name, price);
  if (!name || !price) {
    throw new Error("Faltan campos obligatorios");
  }
  const products = await DB();
  const id = products.length + 1;
  const newProduct = { id, name, price };
  products.push(newProduct);

  return newProduct;
};

export const deleteProduct = async (id) => {
  const products = await DB();
  const product = products.find((product) => product.id == id);
  if (!product) {
    throw new Error("Error. No se encontró el producto a eliminar");
  }
  const productsUpdate = products.filter((product) => product.id != id);
  data = productsUpdate;
  const deletedProduct = product;
  return deletedProduct;
};
