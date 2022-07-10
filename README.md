# Projeto espelho para novos projetos

## Inicializar o git no projeto

```git
git init
```

## Inicializa npm no projeto

```node js
npm init -y
```

## Instala o express no projeto

```node js
npm install express --save
```

## Instala EJS no projeto

```node js
npm install ejs
```

## Instala o nodemon como dependencia de desenvolvimento

```node js
npm install nodemon -D
```

### Criação do arquivo app.js

* criar arquivo no diretorio raiz app.js

### Criação do arquivo .gitignore

* criar arquivo no diretorio raiz .gitignore: node_modules; package.json; yarn.lock

### Criação das pastas:

* public => css; img; js
* src => controllers; routes; views: partials;

#### Confirar o arquivo de configuração da aplicação: app.js

1. Importar o express
```javascript
const express = require('express');
```

2. Inicializar o express
```javascript
const app = express();
```

3. Criar a porta para rodar o servidor
```javascript
const port = 3000;
```

4. Rodar o express na porta definida
```javascript
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
```

5. Configuração para acessar externamente conteúdo de uma pasta
```javascript
app.use(express.static(__dirname + "/public"));
```

6. Altera confugiração inicial do express para do template engine para ejs
```javascript
app.set('view engine', 'ejs');
```

7. ALtera configuração inicial do express do caminho do views para o nosso caminho de arquivos
```javascript
app.set('views', __dirname + '/src/views');
```

8. Converte o "body" da requisição para json (objeto)
```javascript
app.use(express.json());
```
### Pacote utilizado para sobrescrever com PUT/DELETE o methode GET/POST no formulário
```node js
npm install method-override --save
```
### Biblioteca para receber arquivos do cliente e envialos para o servidor
```node js
npm install multer
```
### Biblioteca para validar as requisições que chegam dos formulários são as que esperamos
```node js
npm install express-validator
```

### Permite armazenar informações de maneira segura no servidor durante a visita do usuário ao site
```node js
npm install express-session --save
```

### Permite salvar arquivos no lado do cliente
```node js
npm install cookie-parser
```

### Biblioteca que permite criptografar as informações
```node js
npm install crypto ou npm install bcrypt
```
