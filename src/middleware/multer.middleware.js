import multer from "multer";
import { registerFreelancerSchema } from "../schemas/freelancer.schema.js";

function checkFileType(req, file, cb) {
  // Validate req.body
  req.body.experienceYears = Number(req.body.experienceYears);
  const validation = registerFreelancerSchema.safeParse(req.body);

  if (!validation.success) {
    cb({ code: 400, message: "Validation errors, Bad request" }, false);
  }

  // Validate the file
  if (!file) {
    cb({ code: 400, message: "Please provide the File" }, false);
  }

  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(file.originalname.toString());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      {
        code: 400,
        message: "Error: Invalid file type provided, Images only!",
      },
      false
    );
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => checkFileType(req, file, cb),
});

export const cpUpload = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "coverBanner", maxCount: 1 },
  { name: "imageReferences", maxCount: 4 },
]);
