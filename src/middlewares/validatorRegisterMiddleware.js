const path = require('path');
const { body } = require('express-validator');


module.exports = [
    body('nome').isLength({ min: 3 }).withMessage('O nome deve ter no mínimo 3 caracteres!'),
    body('nome').custom((value) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }
        return true
    }),

    body('sobrenome').custom((value) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }
        return true
    }),

    body('email').isEmail().withMessage('Preencha com um e-mail válido!'),
    body('email').custom((value, { req }) => {
        if (!value) {
            return Promise.reject('E-mail é obrigatório');
        }
        if (value === req.body.email) {
            return Promise.reject('E-mail já cadastrado');
        }
        return true
    }),

    body('senha').isLength({ min: 8 }).withMessage("A senha deve conter no mínimo 8 caracteres"),
    body('senha').custom((value, { req }) => {
        if (!value) {
            return Promise.reject('Campo obrigatório');
        }
        return true
    }),
    body('confirmar_senha').notEmpty().withMessage('Campo obrigatório').isLength({ min: 8 }).withMessage("A senha deve conter no mínimo 8 caracteres"),

    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

        if (!file) {
            return Promise.reject('Precisa escolher um arquivo');
            throw new Error('Precisa escolher um arquivo');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                return Promise.reject(`As extensões de arquivo permitidas são ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })

];