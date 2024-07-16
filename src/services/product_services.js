import "dotenv/config";

let productDao;

const initializeProductDao = async () => {
  if (process.env.PERSISTENCE === "fs") {
    const { __dirname } = await import("../utils.js");
    const { default: ProductDaoFS } = await import(
      "../daos/filesystem/product_dao.js"
    );
    productDao = new ProductDaoFS(`${__dirname}/data/products.json`);
  } else if (process.env.PERSISTENCE === "mongodb") {
    const { default: ProductDaoMongoDB } = await import(
      "../daos/mongodb/product_dao.js"
    );
    productDao = new ProductDaoMongoDB();
  } else {
    throw new Error("PERSISTENCE no definido o no soportado.");
  }
};

// Call the function to initialize 'productDao'
await initializeProductDao();

export const getAllProducts = async (page, limit, category, stock, sort) => {
  try {
    return await productDao.getAllProducts(page, limit, category, stock, sort);
  } catch (error) {
    throw new Error(error);
  }
};

export const getProductById = async (id) => {
  try {
    return await productDao.getProductById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const createProduct = async (object) => {
  try {
    return await productDao.createProduct(object);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProduct = async (id, object) => {
  try {
    return await productDao.updateProduct(id, object);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    return await productDao.deleteProduct(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const getProductByCode = async (code) => {
  try {
    return await productDao.getProductByCode(code);
  } catch (error) {
    throw new Error(error);
  }
};
