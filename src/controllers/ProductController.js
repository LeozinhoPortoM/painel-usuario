const products = [
    {
        id: 1,
        nome: "Blusa azul",
        descricao: "Blusa muito fashion",
        preco: 89.99,
        tamanho: "G",
    },
    {
        id: 2,
        nome: "Blusa amarela",
        descricao: "Blusa muito fashion amarela",
        preco: 69.99,
        tamanho: "M",
    },
    {
        id: 3,
        nome: "Blusa Rosa",
        descricao: "Blusa de roqueiro",
        preco: 49.99,
        tamanho: "PP",
    },
    {
        id: 4,
        nome: "Blusa Dark",
        descricao: "Blusa trevosa",
        preco: 209.99,
        tamanho: "M",
    },
    {
        id: 5,
        nome: "Blusa Light",
        descricao: "Blusa iluminada, contem led",
        preco: 79.99,
        tamanho: "G",
    },
    {
        id: 6,
        nome: "Blusa Doce",
        descricao: "Blusa que gruda",
        preco: 19.99,
        tamanho: "G",
    },
];

const { validationResult } = require('express-validator');

const ProductController = {

    // Lista todos os produtos
    // Pode retornar uma página ou não
    index: (req, res) => {
        return res.render("products", {
            title: "Lista de Produtos",
            listProducts: products,
        });
    },
    // Mostra um produto
    // Pode retornar uma página ou não
    show: (req, res) => {
        const { id } = req.params;
        const productResult = products.find(product => product.id === parseInt(id));

        if (!productResult) {
            return res.render("not-found", {
                title: "Erro",
                message: "Erro ao encontar produto",
            });
        }
        return res.render("product", {
            title: "Visualizar produto",
            product: productResult
        });
    },
    // Página de exibição para criar produto através de um formulário
    viewCreateForm: (req, res) => {
        return res.render('product-create', { title: "Criar Produtos" })
    },
    // Página para criar produto
    create: (req, res) => {
        // Salvar no banco
        return res.render("product-create", { title: "Cadastrar produto" });
    },
    // Cria produto
    // Não retorna página
    store: (req, res) => {
        const errors = validationResult(req);
        const { nome, descricao, preco, tamanho } = req.body;
        if (!errors.isEmpty()) {
            return res.render("product-create", { title: "Cadastrar produto", errors: errors.mapped(), old: req.body });
        }

        const newProduct = {
            id: products.length + 1,
            nome,
            descricao,
            preco,
            tamanho,
        };
        
        products.push(newProduct);
        return res.render("success", {
            title: "Sucesso!",
            message: "Produto criado com sucesso!",
        });
    },

    // Página para editar produto
    edit: (req, res) => {
        const { id } = req.params;
        const productResult = products.find((product) => product.id === parseInt(id));
        // const productResult = products.find((product) => product.id.toString() === id);
        if (!productResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhum produto encontrado",
            });
        }
        return res.render("product-edit", {
            title: "Editar produto",
            product: productResult,
        });
    },
    // Edita produto
    // Não retorna página
    update: (req, res) => {
        const { id } = req.params;
        const { nome, descricao, preco, tamanho } = req.body;
        const productResult = products.find((product) => product.id === parseInt(id));
        // const productResult = products.find((product) => product.id.toString() === id);
        if (!productResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhum produto encontrado",
            });
        }
        const updateProduct = productResult;
        if (nome) updateProduct.nome = nome;
        if (descricao) updateProduct.descricao = descricao;
        if (preco) updateProduct.preco = preco;
        if (tamanho) updateProduct.tamanho = tamanho;
        return res.render("success", {
            title: "Produto atualizado",
            message: `Produto ${updateProduct.nome} foi atualizado`,
        });
    },
    // Deleta produto
    // Não retorna página
    delete: (req, res) => {
        const { id } = req.params;
        const productResult = products.find((product) => product.id === parseInt(id));
        // const productResult = products.find((product) => product.id.toString() === id);
        if (!productResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhum produto encontrado",
            });
        }
        return res.render("product-delete", {
            title: "Deletar produto",
            product: productResult,
        });
    },
    // O método acima pode ser chamado de destroy
    destroy: (req, res) => {
        const { id } = req.params;
        const productResult = products.findIndex((product) => product.id === parseInt(id));
        if (productResult === -1) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhum produto encontrado",
            });
        }
        products.splice(productResult, 1);
        return res.render("success", {
            title: "Produto deletado",
            message: "Produto deletado com sucesso!",
        });
    },

};
module.exports = ProductController;