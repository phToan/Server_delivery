import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middlewares/verify_token'

const routes = express.Router()

//auth
routes.post('/register',controllers.register_dri)
routes.post('/login',controllers.login_dri)
routes.post('/refresh_token',controllers.refreshToken_dri)

//update
routes.put('/',controllers.updateDriver)
routes.put('/password',controllers.update_pass_dri)

routes.use(verifyToken)
routes.get('/', controllers.getDriver)

module.exports = routes