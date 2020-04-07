const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');

const app = express();

// com o cors, somente a origem informada poderá acessar o back
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json()); //adicionar isso antes das rotas para poder receber requisições POST com json
app.use(routes);
app.use(errors()); //com isso o celebrate vai trazer os erros do back-end no formato json

module.exports = app;
