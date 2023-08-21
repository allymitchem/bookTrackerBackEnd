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
    getUserById, getUser} = require("../db")

    usersRouter.use("", (req, res, next) => {
        console.log("A request has been made to users...")
        next()
    })

    usersRouter.get("", requireUser, async (req, res, next) => {
        try {
            if (req.user.id == 1){
                const allUsers = await getAllUsers()
                console.log(allUsers)
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

    usersRouter.post("/login", async (req, res, next) => {
        const {username, password} = req.body
        if(!username || !password){
            next ({
                error:"MissingCredentialsError",
                message:"Please supply both a username and a password"
            })
        }
        try {
            const user = await getUser({username, password})
            if (user){
                const token =jwt.sign({id: user.id, username}, JWT_SECRET)
                res.send({message:"You are logged in!", token, user})
            } else {
                next({
                    error:"IncorrectCredentialsError",
                    message: "Username or password is incorrect"
                })
            }
        } catch(error){
            next(error)
        }
    })

    



    module.exports = usersRouter