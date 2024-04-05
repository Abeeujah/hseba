import { ProductModel } from "../models/seller/product.model.js";
import { SellerModel } from "../models/seller/seller.model.js";

export async function createProduct(productDto) {
  try {
    const { seller } = productDto;
    const productOwner = await SellerModel.findById(seller);

    if (!productOwner) {
      throw new Error("No seller matching this specified credential");
    }

    const product = await ProductModel.create(productDto);

    if (!product) {
      throw new Error("Failed to create product");
    }

    productOwner.products.push(product._id);
    await productOwner.save();

    const { name, price, category, description, images } = product;

    return { name, price, category, description, images };
  } catch (error) {
    console.error({ createProductError: error });
    throw new Error(error.message);
  }
}

export async function getProductsBySellerId(sellerId) {
  try {
    const products = await ProductModel.find({ seller: sellerId });

    if (!products.length) {
      return false;
    }

    return products;
  } catch (error) {
    console.error({ getProductsBySellerIdError: error });
    throw new Error("Failed to get seller's products.");
  }
}

export async function getProductById(productId) {
  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return false;
    }

    return product;
  } catch (error) {}
}

export async function deleteProductById(productId) {
  try {
    const product = await ProductModel.findByIdAndDelete(productId);

    if (!product) {
      return false;
    }

    const { name, price, category, description, images } = product;

    return { name, price, category, description, images };
  } catch (error) {}
}

export async function updateProduct(filter, update) {
  try {
    const product = await ProductModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!product) {
      return false;
    }

    const { name, price, category, description, images } = product;

    return { name, price, category, description, images };
  } catch (error) {
    throw new Error(error.message);
  }
}
