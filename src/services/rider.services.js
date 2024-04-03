import { RiderModel } from "../models/rider/rider.model.js";

export async function setupRider(riderDto, user) {
  try {
    const rider = await RiderModel.create(riderDto);

    if (!rider) {
      return false;
    }

    user.rider = rider._id;
    await user.save();

    const {
      vehicleModel,
      vehicleName,
      vehicleDocument,
      vehiclePicture,
      vehiclePlateNumber,
      riderPicture,
      location,
    } = rider;

    return {
      vehicleModel,
      vehicleName,
      vehicleDocument,
      vehiclePicture,
      vehiclePlateNumber,
      riderPicture,
      location,
    };
  } catch (error) {
    console.error({ dbError: error.message });
    throw new Error("Failed to setup rider profile");
  }
}
