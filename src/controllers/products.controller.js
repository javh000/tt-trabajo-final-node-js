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

export const getAllProducts = async (req, res) => {
  try {
    const products = await DB();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Controller error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const products = await DB();
    console.log(products);
    const product = products.find((product) => product.id == id);
    console.log(product);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Controller error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    console.log("name and price:", name, price);
    const products = await DB();
    console.log("productos desde DB -->", products);

    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    console.log("lista actualizada -->", products);
    return res
      .status(201)
      .json({ message: "Producto creado:", product: newProduct });
  } catch (error) {
    console.error("Controller error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await DB();
    const product = products.find((product) => product.id == id);
    if (!product) {
      res.status(404).json("Producto no encontrado");
    }
    const productsUpdate = products.filter((product) => product.id != id);
    console.log(productsUpdate);
    data = productsUpdate;
    return res
      .status(200)
      .json({ message: "Producto eliminado correctamente", product: product });
  } catch (error) {
    console.log("Controller error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
