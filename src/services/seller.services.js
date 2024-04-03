import { SellerModel } from "../models/seller/seller.model.js";

export async function setupSeller(sellerDto) {
  try {
    const seller = await SellerModel.create(sellerDto);

    if (!seller) {
      return false;
    }

    user.seller = seller._id;
    await user.save();

    const { storeName, itemsType, coverBanner, profilePhoto } = seller;

    return { storeName, itemsType, coverBanner, profilePhoto };
  } catch (error) {
    console.error({ setupSellerError: error });
    throw new Error("Failed to setup seller profile.");
  }
}

export async function getSellerById(sellerId) {
  try {
    const seller = await SellerModel.findById(sellerId);

    if (!seller) {
      return false;
    }

    return seller;
  } catch (error) {
    console.error({ getSellerByIdError: error });
    throw new Error("Failed to retrieve seller by ID.");
  }
}
