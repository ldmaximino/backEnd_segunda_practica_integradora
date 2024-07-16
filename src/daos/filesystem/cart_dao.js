import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import ProductManager from "./product_dao.js";
import { __dirname } from "../../utils.js";

const productsManager = new ProductManager(`${__dirname}/data/products.json`);

export default class CartsManager {
  constructor(path) {
    this.path = path;
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(carts);
      } else return [];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(cid) {
    try {
      const carts = await this.getAllCarts();
      const cartExist = carts.find((ca) => ca.id === cid);
      if (!cartExist) return null;
      return cartExist;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart(obj) {
    try {
      const cart = { id: uuidv4(), products: [] };
      const carts = await this.getAllCarts();
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return { status: "Cart created", cart };
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveProductToCart(cid,pid) {
    try {
      const productExist = await productsManager.getProductById(pid); //check if the product exists
      if (!productExist) throw new Error("Product not found");
      const cart = await this.getCartById(cid); //check if the cart exists
      if (!cart) throw new Error("Cart not found");
      const existProductIndex = cart.products.findIndex(
        (prod) => prod.product === pid
      );
      if (existProductIndex !== -1) {
        cart.products[existProductIndex].quantity++; //if the product exists in the cart, add 1 to the quantity
      } else {
        cart.products.push({
          product: pid,
          quantity: 1,
        }); //if the product doesn't exist in the cart, add it with quantity equal to 1
      }
      //All carts are updated
      const carts = await this.getAllCarts();
      const newCarts = carts.filter((ca) => ca.id !== cid); //A new array is generated that does not include the cart to which we added the product
      newCarts.push(cart); //the updated cart is added to the new cart array
      await fs.promises.writeFile(this.path, JSON.stringify(newCarts));
      return { status: "Product added to cart", cart };
    } catch (error) {
      throw new Error(error);
    }
  }
}
