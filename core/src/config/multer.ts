
import multer from "multer";
import path from "node:path";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(tmpFolder)
        cb(null, tmpFolder);
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        cb(null, Date.now() + '-' + file.fieldname + fileExtension);
    }
});

const midlewareTemplateFile = multer({ storage }).single("template");

export { midlewareTemplateFile };
