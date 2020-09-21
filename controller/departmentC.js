import mongoose from "mongoose";
import Department from "../models/departmentM";
import Category from "../models/categoriesM";
import Product from "../models/productM";

const dpartmentC = {};

dpartmentC.addDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    if (!department)
      return res.status(403).send("No se ha pdodio añadir el departamento");
    res.json(department);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

dpartmentC.getDepartments = async (req, res) => {
  try {
    const dpartments = await Department.find();
    if (!dpartments)
      return res
        .status(403)
        .send("No se han encontrado departamentos para mostrar");
    res.json(dpartments);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

dpartmentC.deleteDepartment = async (req, res) => {
  const _id = req.params.id;
  try {
    const department = await Department.findByIdAndDelete({ _id });

    if (!department)
      return res.status(403).send("No se ha podido eliminar el Departamento");
    const categories = await Category.find({ department: department.name });
    categories.forEach(async (element) => {
      const { _id } = element;
      const category = await Category.findByIdAndDelete({ _id });
      const products = await Product.find({ category: category.name });
      products.forEach(async (product) => {
        const { _id } = product;
        console.log(_id);
        const produc = await Product.findByIdAndDelete({ _id });
      });
    });
    res.json(department);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

dpartmentC.updateDepartment = async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const department = await Department.findByIdAndUpdate(_id, body, {
      new: true,
    });
    if (!department)
      return res.status(403).send("No se ha podido actualizar el Departamento");
    res.json(department);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

dpartmentC.getDepartmentById = async (req, res) => {
  const _id = req.params.id;
  try {
    const department = await Department.findById({ _id });
    if (!department)
      return res.status(403).send("No se ha podido encontrar el Departamento");
    res.json(department);
  } catch (error) {
    res.status(500).json({
      error,
      mensaje: "Ha ocurrido un error en el servidor",
    });
  }
};

export default dpartmentC;
