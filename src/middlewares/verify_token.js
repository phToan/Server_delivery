import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { badRequest, notAuth } from './handle_errors'

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return notAuth('Require authorization', res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            const isCheck = err instanceof TokenExpiredError
            if (isCheck) {
                return notAuth('Access token expired', res, isCheck)
            }
            if (!isCheck) {
                return notAuth('Access token invalid', res, isCheck)
            }
        }
        req.user = user
        next()
    })
}

export default verifyToken