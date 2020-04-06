const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Métodos HTTP: 
 * GET: Buscar/listar informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end 
 */

/**
 * Tipos de parâmetros:
 * Query: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação) - const params = req.query;
 * Route Params: Parâmetros utilizados para identificar recursos - na rota: '/users/:id' - pegando parametros: const params = req.params;
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos com os métodos POST e PUT - const body = req.body;
 *
 */

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;