const express = require('express')
const apiRouter = express.Router()



const jwt = require("jsonwebtoken")
const { getUserById } = require('../db')
const {JWT_SECRET} = process.env

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer'
 const auth = req.header('Authorization')
    if (!auth){
        next()
    } else if (auth.startsWith(prefix)){
        const token = auth.slice(prefix.length)

        try {
            const {id} = jwt.verify(token, JWT_SECRET)

            if(id) {
                req.user = await getUserById(id)
                next()
            }
            } catch ({error, name, message}){
                next({error, name, message})
            }
        } else {
            next({ 
                name: "AuthorizationHeaderError",
                message:"Authorization token must start with 'Bearer'"
            })
        }
    
})

const usersRouter = require('./users')
apiRouter.use('/users', usersRouter)

module.exports = apiRouter