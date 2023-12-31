const customer = require('./customer')
import order from './order'
import driver from './driver'
import socket from './socket'
import { notFound } from '../middlewares/handle_errors'


const initRoutes = (app) =>{
    app.use('/customer',customer)
    // app.use('/api/v1/auth',auth)
    app.use('/order',order)
    app.use('/driver',driver)
    app.use('/socket', socket)

    app.use('/', notFound)
}

module.exports = initRoutes