const express = require('express');
const router = express.Router();
const ProductControlller = require('../controllers/ProductController');
const path = require('path');
const multer = require('multer');
const {check} = require('express-validator');


const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folder = path.join(__dirname, "../public/profile");
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        const imageName = Date.now() + file.originalname;
        callback(null, imageName);
    },
});


const validacoes = [
    check('nome').notEmpty().withMessage('Campo obrigatório').isString(),
    check('descricao').notEmpty().withMessage('Campo obrigatório').isString(),
    check('preco').notEmpty().withMessage('Campo obrigatório').isNumeric(),
    check('tamanho').notEmpty().withMessage('Campo obrigatório').isString(),
];


router.get("/create", ProductControlller.create);
router.post("/create",validacoes, ProductControlller.store);

router.get("/edit/:id", ProductControlller.edit);
router.put("/edit/:id", ProductControlller.update);

router.get("/delete/:id", ProductControlller.delete);
router.delete("/delete/:id", ProductControlller.destroy);

router.get("/", ProductControlller.index);
router.get("/:id", ProductControlller.show);

module.exports = router;