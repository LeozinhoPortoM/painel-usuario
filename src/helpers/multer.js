const multer = require('multer');
const crypto = require("crypto");
const path = require('path');

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folder = path.join(__dirname + "/../../uploads/");
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        // Pegar extensão do arquivo
        const extension = file.originalname.split(".")[1];
        // Gera string randomica
        const newName = crypto.randomBytes(10).toString("hex");
        // const imageName = Date.now() + file.originalname;
        // Altera o nome do arquivo para a string randomica
        callback(null, `${newName}.${extension}`);
    },
});

const upload = multer({ storage: multerDiskStorage });

module.exports = upload;