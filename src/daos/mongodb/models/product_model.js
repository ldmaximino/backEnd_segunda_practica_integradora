import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const productsCollectionName = "products";

export const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  thumbnails: {
    type: [String],
    required: true,
  },
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(productsCollectionName, productSchema);
