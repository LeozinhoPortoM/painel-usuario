const { urlencoded } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const indexRoute = require('./src/routes/indexRoute');
const userRoute = require('./src/routes/userRoute');


app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/src/views');

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: false}));

app.use(express.json())

app.use('/', indexRoute);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Estamos rodando na porta: ${port}`);
});