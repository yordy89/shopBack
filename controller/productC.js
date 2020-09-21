import mongoose from "mongoose";
import Product from "../models/productM";

const productC = {};

productC.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (!product)
      return res.status(403).send("No se ha pdodio añadir el producto");
    res.json(product);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

productC.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res
        .status(403)
        .send("No se han encontrado productos para mostrar");
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

productC.deleteProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete({ _id });
    if (!product)
      return res.status(403).send("No se ha podido eliminar el Producto");
    res.json(product);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

productC.updateProduct = async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const product = await Product.findByIdAndUpdate(_id, body, { new: true });
    if (!product)
      return res.status(403).send("No se ha podido actualizar el Producto");
    res.json(product);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

export default productC;
