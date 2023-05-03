import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";
    switch (file.fieldname) {
      case "profile_image":
        folder = path.join(__dirname, "..", "..", "uploads", "profiles");
        break;
      case "product_image":
        folder = path.join(__dirname, "..", "..", "uploads", "products");
        break;
      case "identificacion":
        folder = path.join(__dirname, "..", "..", "uploads", "users", "identificacion");
        break;
      case "comprobante_domicilio":
        folder = path.join(__dirname, "..", "..", "uploads", "users", "comprobante_domicilio");
        break;
      case "estado_cuenta":
        folder = path.join(__dirname, "..", "..", "uploads", "users", "estado_cuenta");
        break;
      default:
        folder = path.join(__dirname, "..", "..", "uploads", "documents");
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
