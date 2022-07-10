const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const upload = require('../helpers/multer');
const { check } = require('express-validator');


const validacoes = [
    check('nome').notEmpty().withMessage('Campo obrigatório').bail().isString().isLength({ min: 3 }).withMessage('O nome deve ter no mínimo 4 caracteres!'),
    check('sobrenome').notEmpty().withMessage('Campo obrigatório').bail().isString(),
    check('email').notEmpty().withMessage('Campo obrigatório').bail().isEmail().withMessage('Preencha com um e-mail válido!'),
    check('idade').notEmpty().withMessage('Campo obrigatório').bail().isNumeric(),
    check('avatar').notEmpty().withMessage('Campo obrigatório').bail(),
];


router.get("/create", UserController.create);
router.post("/create", upload.single("avatar"), UserController.store);

router.get("/edit/:id", UserController.edit);
router.put("/edit/:id", upload.single("avatar"), UserController.update);

router.get("/delete/:id", UserController.delete);
router.delete("/delete/:id", UserController.destroy);

router.get('/login', UserController.loginForm);
router.post('/login', UserController.loginUser);

router.get("/", UserController.index);
router.get('/:id', UserController.show);

module.exports = router;