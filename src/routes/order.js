import * as controllers from '../controllers'
import express from 'express'

const routes = express.Router()
// routes.get('/',)
routes.post('/customer',controllers.createOrder)
routes.post('/driver',controllers.create_Order_dri)
routes.put('/customer',controllers.deleteOrder)
routes.put('/driver',controllers.delete_Order_dri)
routes.put('/driver/update', controllers.updateOrder)
routes.put('/customer/update', controllers.updateOrders)
routes.get('/customer',controllers.getOrder)
routes.get('/driver',controllers.get_Order_dri)
routes.get('/driver/day',controllers.getOrder_day)

module.exports = routes