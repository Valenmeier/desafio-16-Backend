// upload.js
import multer from "multer";
import path, { extname } from "path";
import fs from "fs";
import _dirname from "../utils.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";
    const userId = req.user._id.toString(); // Asegúrate de que sea una cadena

    switch (file.fieldname) {
      case "profile_image":
        folder = path.join(
          _dirname,
          "..",
          "uploads",
          "profiles",
        );
        break;
      case "product_image":
        folder = path.join(
          _dirname,
          "..",
          "uploads",
          "users",
          userId,
          "productImages"
        );
        break;
      case "identificacion":
        folder = path.join(
          _dirname,
          "..",
          "uploads",
          "users",
          userId,
          "identificacion"
        );
        break;
      case "comprobante_domicilio":
        folder = path.join(
          _dirname,
          "..",
          "uploads",
          "users",
          userId,
          "comprobante_domicilio"
        );
        break;
      case "estado_cuenta":
        folder = path.join(
          _dirname,
          "..",
          "uploads",
          "users",
          userId,
          "estado_cuenta"
        );
        break;
      default:
        folder = path.join(_dirname, "..", "uploads", "documents");
    }

    // Comprobar si la carpeta existe y crearla si no es así
    fs.mkdirSync(folder, { recursive: true });
    const MIMETYPES = ["image/png", "image/webp", "image/jpeg", "image/png"];

    // Elimina el archivo anterior en la carpeta antes de subir uno nuevo
    fs.readdir(folder, (err, files) => {
      if (err) {
     
      } else {
        for (const fileToDelete of files) {
          fs.unlink(path.join(folder, fileToDelete), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`Remplace file: ${fileToDelete}`);
            }
          });
        }
      }
    });

    if (MIMETYPES.includes(file.mimetype)) {
      cb(null, folder);
    } else {
      cb(new Error(`Only ${MIMETYPES.join(", ")} mimetypes are allowed`));
    }
  },
  filename: (req, file, cb) => {
    const fileExtension = extname(file.originalname);
    const fileName = file.originalname.split(fileExtension)[0];
    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
