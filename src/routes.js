const {Router} = require('express')
const DevController = require('./controllers/DevController')
const SearcController = require('./controllers/SearchController')

const routes = Router()

routes.get('/devs',DevController.index)
routes.post('/devs' ,DevController.store)

routes.get('/search',SearcController.index)

module.exports = routes