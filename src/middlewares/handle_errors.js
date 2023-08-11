import createError from 'http-errors'

export const badRequest = (err, res) =>{
    const error = createError.BadRequest(err)
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const interalServerError = (res) =>{
    const error = createError.InternalServerError()
    return res.status(error.status).json({
        err: 2,
        mes: error.message
    })
}

export const notFound = (req, res) =>{
    const error = createError.NotFound()
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const notAuth = (err, res, isCheck) =>{
    const error = createError.Unauthorized(err)
    return res.status(error.status).json({
        err: isCheck ? 1 : 2,
        mes: error.message
    })
}