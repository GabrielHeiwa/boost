
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/');
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        cb(null, Date.now() + '-' + file.fieldname + fileExtension);
    }
});

const midlewareTemplateFile = multer({ storage }).single("template");

export { midlewareTemplateFile };
