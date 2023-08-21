const  express = require('express')
const usersRouter = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const {requireUser} = require("./utils")
const bcrypt = require("bcrypt")
const { createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByUsername, 
    getUserById} = require("../db")

    usersRouter.use("", (req, res, next) => {
        console.log("A request has been made to users...")
        next()
    })

    usersRouter.get("", requireUser, async (req, res, next) => {
        try {
            if (req.user.id == 1){
                const allUsers = await getAllUsers()
                res.send(allUsers)
            } else {
                next({
                    name: "NotAuthorizedError",
                    message: "You are not authorized to view this page"
                })
            }
        } catch (error){
            console.error(error)
            next(error)
        }
    })

    usersRouter.get("/me", requireUser, async (req, res, next)=>{
        const user = await getUserById(req.user.id)
        try { 
            res.send(user)
        } catch ({name, message}){
            next({name, message})
        }
    })

    



    module.exports = usersRouter