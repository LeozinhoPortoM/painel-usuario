const files = require("../helpers/files");
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const upload = require('../config/upload');

const users = [
  {
    id: 1,
    nome: "Roberto",
    sobrenome: "Silva",
    email: "robertinho123@email.com",
    idade: 27,
    avatar: "user1.jpeg",
  },
  {
    id: 2,
    nome: "Ana",
    sobrenome: "Monteiro",
    email: "aninha123@email.com",
    idade: 22,
    avatar: "user2.jpeg",
  },
  {
    id: 3,
    nome: "Juliana",
    sobrenome: "Rios",
    email: "ju123@email.com",
    idade: 18,
    avatar: "user3.jpeg",
  },
  {
    id: 4,
    nome: "João",
    sobrenome: "Oliveira",
    email: "joaozinho123@email.com",
    idade: 45,
    avatar: "user4.jpeg",
  },
  {
    id: 5,
    nome: "Roberto",
    sobrenome: "Carlos",
    email: "robertinho123@email.com",
    idade: 70,
    avatar: "user5.jpeg",
  },
  {
    id: 6,
    nome: "Pedro",
    sobrenome: "Santos",
    email: "pedrinho123@email.com",
    idade: 20,
    avatar: "user6.jpeg",
  },
  {
    id: 7,
    nome: "Lucas",
    sobrenome: "Morais",
    email: "luquinhas123@email.com",
    idade: 30,
    avatar: "user7.jpeg",
  },
  {
    id: 8,
    nome: "Hélder",
    sobrenome: "Santos",
    email: "helder123@email.com",
    idade: 25,
    avatar: "user8.jpeg",
  },
  {
    id: 9,
    nome: "Marcos",
    sobrenome: "Souza",
    email: "marquinhos123@email.com",
    idade: 40,
    avatar: "user9.jpeg",
  },
];

const UserController = {
  // Lista todos os usuário
  // Pode retornar uma página ou não
  index: (req, res) => {
    return res.render('users', { title: 'Lista de usuários', users });
  },
  // Mostra um usuário
  // Pode retornar uma página ou não
  show: (req, res) => {
    // Pega o parametro que vem da url, ou seja, na url a baixo, pegaria o valor 4
    // localhost:3000/user/4
    // id = 4
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    // const userResult = users.find((user) => user.id.toString() === id);
    if (!userResult) {
      return res.render("not-found", {
        title: "Ops!",
        message: "Usuário não encontrado",
      });
    }

    const user = {
      ...userResult,
      avatar: files.base64Encode(upload.path + userResult.avatar),
    };

    return res.render("user", {
      title: "Visualizar usuário",
      user,
    });
  },

  // Página para criar usuário
  create: (req, res) => {
    return res.render("user-create", { title: "Cadastrar usuário" });
  },
  // Cria usuário
  // Não retorna página
  store: (req, res) => {
    const errors = validationResult(req);
    const { nome, sobrenome, idade, email } = req.body;
    let filename = "user-default.jpeg";
    if (req.file) {
      filename = req.file.filename;
    }
    if (!errors.isEmpty()) {
      return res.render("user-create", { title: "Cadastrar usuário", errors: errors.mapped(), old: req.body });
    }
    const newUser = {
      id: users.length + 1,
      nome,
      sobrenome,
      idade,
      email,
      avatar: filename,
    };
    users.push(newUser);
    return res.render("success", {
      title: "Sucesso!",
      message: "Usuário criado com sucesso!",
    });
  },
  // Página para editar usuário
  edit: (req, res) => {
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    // const userResult = users.find((user) => user.id.toString() === id);
    if (!userResult) {
      return res.render("not-found", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    return res.render("user-edit", {
      title: "Editar usuário",
      user: userResult,
    });
  },
  // Edita usuário
  // Não retorna página
  update: (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, idade, email } = req.body;
    const userResult = users.find((user) => user.id === parseInt(id));
    // const userResult = users.find((user) => user.id.toString() === id);

    let filename;
    if (req.file) {
      filename = req.file.filename;
    }

    if (!userResult) {
      return res.render("not-found", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    const updateUser = userResult;
    if (nome) updateUser.nome = nome;
    if (sobrenome) updateUser.sobrenome = sobrenome;
    if (email) updateUser.email = email;
    if (idade) updateUser.idade = idade;
    if (filename) {
      let avatarTmp = updateUser.avatar;
      fs.unlinkSync(upload.path + avatarTmp);
      updateUser.avatar = filename;
    }
    return res.render("success", {
      title: "Usuário atualizado",
      message: `Usuário ${updateUser.nome} foi atualizado`,
    });
  },
  // Deleta usuário
  // Não retorna página
  delete: (req, res) => {
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    // const userResult = users.find((user) => user.id.toString() === id);
    if (!userResult) {
      return res.render("not-found", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    const user = {
      ...userResult,
      avatar: files.base64Encode(upload.path + userResult.avatar),
    };
    return res.render("user-delete", {
      title: "Deletar usuário",
      user,
    });
  },
  // O método acima pode ser chamado de destroy
  destroy: (req, res) => {
    const { id } = req.params;
    const result = users.findIndex((user) => user.id === parseInt(id));
    if (result === -1) {
      return res.render("not-found", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    fs.unlinkSync(upload.path + users[result].avatar);
    users.splice(result, 1);
    return res.render("success", {
      title: "Usuário deletado",
      message: "Usuário deletado com sucesso!",
    });
  },

  loginForm: (req, res) => {
    res.render('login', { title: "Login" });
  },

  loginUser: (req, res) => {
    const { email, senha, logado } = req.body;
    const userSave = fs.readFileSync(userJson, { encoding: 'utf-8' });
    userSave = JSON.parse(userSave);

    if (email != userSave.email) {
      return res.send('Usuário invalido!');
    }

    if (!bcrypt.compareSync(senha, userSave.senha)) {
      return res.send("Senha invalida");
    }

    req.session.user = userSave;

    if (logado != undefined) {
      res.cookie('logado', userSave.email, { maxAge: 600000 })
    }

    res.redirect('/user');
  },

};
module.exports = UserController;