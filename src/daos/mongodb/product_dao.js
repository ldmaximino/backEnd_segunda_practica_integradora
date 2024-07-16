import { ProductModel } from "./models/product_model.js";

export default class ProductDaoMongoDB {
  constructor() {}

  async getProducts() {
    try {
      const products = await ProductModel.find({}).lean();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllProducts(page = 1, limit = 10, category, stock, sort) {
    try {
      const filterCategory = category ? { category: category } : {};
      const filterStock = stock ? { stock: { $gt: parseInt(stock) } } : {};
      const filter = {
        ...filterCategory,
        ...filterStock,
      };
      let sortBy = {};
      if (sort) sortBy.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      const products = await ProductModel.paginate(filter, {
        page,
        limit,
        sort: sortBy,
      });
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductByCode(code) {
    try {
      const product = await ProductModel.findOne({ code });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(object) {
    try {
      const product = await ProductModel.create(object);
      return { status: "Product added", product };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(id, object) {
    try {
      const product = await ProductModel.findByIdAndUpdate(id, object, {
        new: true,
      });
      return { status: "Product updated", product };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await ProductModel.findByIdAndDelete(id);
      if (!product) return { message: "Product not found" };
      return { status: "Product deleted", product };
    } catch (error) {
      throw new Error(error);
    }
  }
}
