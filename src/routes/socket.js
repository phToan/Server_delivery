import * as controllers from '../controllers'
import express from 'express'

const routes = express.Router()

routes.post('/',controllers.createSocket)
routes.put('/',controllers.Socket)
routes.get('/',controllers.getSocket)

module.exports = routes