import * as service from "../services/cart_services.js";
import { getProductById } from "../services/product_services.js";

export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await service.getAllCarts();
    if (carts.length > 0) {
      return res.status(200).json(carts);
    } else return res.status(200).json({ msg: "There are not carts" });
  } catch (error) {
    next(error);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.getCartById(cid);
    if (!cart) return res.status(404).json({ msg: "Cart not found" });
    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const cart = await service.createCart();
    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const saveProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const productExist = await getProductById(pid);
    if (!productExist)
      return res.status(404).json({ msg: "Product not found" }); //if the product doesn't exist on db
    const cartExist = await service.getCartById(cid);
    if (!cartExist) return res.status(404).json({ msg: "Cart not found" }); //if the cart doesn't exist on db
    const addProductCart = await service.saveProductToCart(cid, pid);
    return res.status(200).json(addProductCart);
  } catch (error) {
    next(error);
  }
};

export const updateCartWithProducts = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartExist = await service.getCartById(cid);
    if (!cartExist) return res.status(404).json({ msg: "Cart not found" }); //if the cart doesn't exist on db
    const updateCartWithProd = await service.updateCartWithProducts(
      cid,
      req.body
    );
    return res.status(200).json(updateCartWithProd);
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cartExist = await service.getCartById(cid);
    if (!cartExist) return res.status(404).json({ msg: "Cart not found" }); //if the cart doesn't exist on db
    const productExistInCart = cartExist.products.find(
      (prod) => prod.product._id.toString() === pid
    );
    if (!productExistInCart)
      return res.status(404).json({ msg: "Product doesn't exist in the cart" }); //if the product doesn't exist in the cart
    const updateProdQuantity = await service.updateProductQuantity(
      cid,
      pid,
      quantity
    );
    return res.status(200).json(updateProdQuantity);
  } catch (error) {
    next(error);
  }
};

export const deleteProductFromCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cartExist = await service.getCartById(cid);
    if (!cartExist) return res.status(404).json({ msg: "Cart not found" }); //if the cart doesn't exist on db
    const productExistInCart = cartExist.products.find(
      (prod) => prod.product._id.toString() === pid
    );
    if (!productExistInCart)
      return res.status(404).json({ msg: "Product doesn't exist in the cart" }); //if the product doesn't exist in the cart
    const deleteProductFromCart = await service.deleteProductFromCart(cid, pid);
    return res.status(200).json(deleteProductFromCart);
  } catch (error) {
    next(error);
  }
};

export const deleteAllProductsFromCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartExist = await service.getCartById(cid);
    if (!cartExist) return res.status(404).json({ msg: "Cart not found" }); //if the cart doesn't exist on db
    const productsExistInCart = cartExist.products.length;
    if (productsExistInCart === 0)
      return res.status(400).json({ msg: "Cart is empty" });
    const deleteAllProductsFromCart = await service.deleteAllProductsFromCart(
      cid
    );
    return res.status(200).json(deleteAllProductsFromCart);
  } catch (error) {
    next(error);
  }
};
