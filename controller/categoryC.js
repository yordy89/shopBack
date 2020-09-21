import mongoose from "mongoose";
import Category from "../models/categoriesM";
import Product from "../models/productM";

const categoryC = {};

categoryC.addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (!category)
      return res.status(403).send("No se ha podido añadir la categoria");
    res.json(category);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

categoryC.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories)
      return res
        .status(403)
        .send("No se han encontrado categorias para mostrar");
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

categoryC.deleteCategory = async (req, res) => {
  const _id = req.params.id;
  try {
    const category = await Category.findByIdAndDelete({ _id });
    if (!category)
      return res.status(403).send("No se ha podido eliminar la Categoria");
    const products = await Product.find({ category: category.name });
    products.forEach(async (product) => {
      const { _id } = product;
      console.log(_id);
      const produc = await Product.findByIdAndDelete({ _id });
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

categoryC.updateCategory = async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const category = await Category.findByIdAndUpdate(_id, body, { new: true });
    if (!category)
      return res.status(403).send("No se ha podido actualizar la Categoria");
    res.json(category);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

export default categoryC;
