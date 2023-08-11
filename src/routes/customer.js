import verifyToken from '../middlewares/verify_token'
import * as controllers from '../controllers'
import express from 'express'

const routes = express.Router()

//auth
routes.post('/register',controllers.register)
routes.post('/login',controllers.login)
routes.post('/refresh_token',controllers.refreshToken)

//update
routes.put('/',controllers.updateCustomer)
routes.put('/password',controllers.update_pass_cus)

routes.use(verifyToken)
routes.get('/', controllers.getCurrent)

module.exports = routes