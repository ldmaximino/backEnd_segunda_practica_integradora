import "dotenv/config";
import * as service from "../services/product_services.js";

//PORT definition
const PORT = process.env.PORT || 5003;

export const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit, category, stock, sort } = req.query;
    const products = await service.getAllProducts(
      page,
      limit,
      category,
      stock,
      sort
    );
    const nextPage = products.hasNextPage
      ? `http://localhost:${PORT}/api/products?page=${products.nextPage}`
      : null;
    const prevPage = products.hasPrevPage
      ? `http://localhost:${PORT}/api/products?page=${products.prevPage}`
      : null;
    res.status(200).json({
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: prevPage,
      nextLink: nextPage,
      totalDocs: products.totalDocs, //este campo no lo solicitaba el ejercicio pero lo agregué para un mejor control de los filters
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { code } = req.body;
    const productExist = await service.getProductByCode(code);
    if (productExist)
      return res.status(404).json({ msg: "Product already exists" });
    const product = await service.createProduct(req.body);
    if (!product.product)
      return res.status(404).json({ msg: "Error creating product" });
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.updateProduct(pid, req.body);
    if (!product.product)
      return res.status(404).json({ msg: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.deleteProduct(pid);
    if (!product.product)
      return res.status(404).json({ msg: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
