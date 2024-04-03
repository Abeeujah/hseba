import { createProductSchema } from "../../../schemas/product.schema.js";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProductsBySellerId,
  updateProduct,
} from "../../../services/product.service.js";
import { getSellerById } from "../../../services/seller.services.js";
import { validateRequest } from "../../../services/user-info.services.js";

export async function httpCreateProduct(req, res) {
  // Pick seller out of request params
  const { sellerId } = req.params;

  const { user } = req;
  const { email } = user;

  // Validate request
  req.body.price = Number(req.body.price);
  const validation = createProductSchema.safeParse(req.body);

  if (!validation.success) {
    return res
      .status(400)
      .json({ code: 400, message: "Please provide a valid payload." });
  }

  const { price, name, description, category } = validation.data;

  //   Pull product images from res.locals
  const { uploadMapping } = res.locals;
  const { images } = uploadMapping;

  // Create product DTO
  const productDto = {
    price,
    name,
    description,
    category,
    images,
    seller: sellerId,
  };

  // Create the product
  try {
    // Ensure the seller is valid
    const seller = await getSellerById(sellerId);

    if (!seller) {
      return res.status(404).json({
        code: 404,
        message: "No seller with the specified credential.",
      });
    }

    // Ensure the seller is the one making the request
    const whoAmI = await validateRequest(email);

    if (whoAmI.toString() !== sellerId) {
      return res.status(403).json({
        code: 403,
        message: "Unauthorized to perform this action.",
      });
    }

    // Create the product
    const product = await createProduct(productDto);

    if (!product) {
      throw new Error(`Failed to add ${name} to inventory`);
    }

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}

export async function httpViewSellerProducts(req, res) {
  const { sellerId } = req.params;

  try {
    const products = await getProductsBySellerId(sellerId);

    if (!products) {
      return res
        .status(404)
        .json({ message: "Seller does not have any available product." });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}

export async function httpViewProductById(req, res) {
  // Returns the product and the seller's basic details
  const { productId } = req.params;

  try {
    // Fetch and Validate the product exists
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({
        code: 404,
        message: "Product with the provided credential does not exist.",
      });
    }

    // Populate the seller
    await product.populate("seller");

    // Return the View details
    const { name, price, category, description } = product;
    const { storeName, location, rating } = product.seller;

    return res.status(200).json({
      name,
      price,
      category,
      description,
      storeName,
      location,
      rating,
    });
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}

export async function httpUpdateProduct(req, res) {
  // User must be authenticated
  const { email } = req.user;
  const { sellerId, productId } = req.params;

  const validation = createProductSchema.optional().safeParse(req.body);

  if (!validation.success) {
    return res
      .status(400)
      .json({ code: 400, message: "Please provide valid payload." });
  }
  try {
    // Ensure the seller is valid
    const seller = await getSellerById(sellerId);

    if (!seller) {
      return res.status(404).json({
        code: 404,
        message: "No seller with the specified credential.",
      });
    }

    // Ensure the seller is the one making the request
    const whoAmI = await validateRequest(email);

    // Ensure authenticated user is the product owner
    if (whoAmI.toString() !== sellerId) {
      return res.status(403).json({
        code: 403,
        message: "Unauthorized to perform this action.",
      });
    }

    // Update the product
    const product = await updateProduct({ _id: productId });

    if (!product) {
      throw new Error(`Failed to update product ${name}.`);
    }
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}

export async function httpDeleteProductById(req, res) {
  // User must be authenticated
  const { sellerId, productId } = req.params;
  const { email } = req.user;
  console.log(email);

  try {
    const product = await getProductById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ code: 404, message: "No product matching this credential." });
    }

    const whoAmI = await validateRequest(email);

    if (whoAmI.toString() !== sellerId) {
      return res.status(403).json({
        code: 403,
        message: "Unauthorized to perform this action.",
      });
    }

    const deletedProduct = await deleteProductById(productId);
    return res
      .status(204)
      .json({ success: "Product deleted successfully", deletedProduct });
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}
