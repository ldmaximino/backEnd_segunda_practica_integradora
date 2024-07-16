import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductDaoFS {
  constructor(path) {
    this.path = path;
  }

  async getAllProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(pid) {
    try {
      const products = await this.getAllProducts();
      
      const productExist = products.find((prod) => prod.id === pid);
      if (!productExist) return null;
      return productExist;
    } catch (error) {
      throw new Error(error);
    }
  }

    
  async getProductByCode(code) {
    const products = await this.getAllProducts();
    const productExist = products.find((prod) => prod.code === code);
    return productExist;
  }

  async createProduct(obj) {
    try {
      const product = { id: uuidv4(), ...obj, status: true }; // 'status' is defined by default as true because the command/statement said 'Status is true by default'
      const products = await this.getAllProducts();
      //const productExist = products.find((prod) => prod.code === product.code);
      const productExist = await this.getProductByCode(product.code);
      if (productExist) return { msg: "Product already exists" };
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return { status: "Product added", product: product };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(pid, obj) {
    try {
      const products = await this.getAllProducts();
      let productExist = await this.getProductById(pid);
      if (!productExist) return { msg: `ID Product ${pid} does not exist` };
      const newProducts = products.filter((prod) => prod.id !== pid);
      productExist = { ...productExist, ...obj };
      newProducts.push(productExist);
      await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
      return { status: "Product updated", product: productExist };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(pid) {
    try {
      const products = await this.getAllProducts();
      if (products.length > 0) {
        let productExist = await this.getProductById(pid);
        if (!productExist) return { msg: `ID Product ${pid} does not exist` };
        const newProducts = products.filter((prod) => prod.id !== pid);
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
        return { status: "Product deleted", product: productExist };
      } else return { msg: `Product not found` };
    } catch (error) {
      throw new Error(error);
    }
  }
}
