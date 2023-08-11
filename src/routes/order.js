import * as controllers from '../controllers'
import express from 'express'

const routes = express.Router()
// routes.get('/',)
routes.post('/customer',controllers.createOrder)
routes.post('/driver',controllers.create_Order_dri)
routes.put('/customer',controllers.deleteOrder)
routes.put('/driver',controllers.delete_Order_dri)
routes.get('/customer',controllers.getOrder)
routes.get('/driver',controllers.get_Order_dri)

module.exports = routes