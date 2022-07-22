const { check } = require('express-validator');

module.exports = [
    check('nome').notEmpty().withMessage('Campo obrigatório').bail().isString().isLength({ min: 3 }).withMessage('O nome deve ter no mínimo 4 caracteres!'),
    check('descricao').notEmpty().withMessage('Campo obrigatório').bail().isString(),
    check('preco').notEmpty().withMessage('Campo obrigatório').bail().isNumeric(),
    check('tamanho').notEmpty().withMessage('Campo obrigatório').bail().isString(),
];