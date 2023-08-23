
const  express = require('express')
const usersRouter = express.Router()
const jwt = require('jsonwebtoken')

const {requireUser} = require("./utils")
const bcrypt = require("bcrypt")
const { createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByUsername, 
    getUserById,
    getUser,
    getUserByEmail} = require("../db")


    usersRouter.use("", (req, res, next) => {
        console.log("A request has been made to users...")
        next()
    })

// for admin to see all users

    usersRouter.get("", requireUser, async (req, res, next) => {
        
        try {
            console.log("Attempting to get all users...")
            if (req.user.id == 1){
                const allUsers = await getAllUsers()
                console.log(allUsers)
                res.send(allUsers)
                console.log("Retrieved all users...")
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
// users own info
    usersRouter.get("/me", requireUser, async (req, res, next)=>{
        const user = await getUserById(req.user.id)
        try { 
            res.send(user)
        } catch ({name, message}){
            next({name, message})
        }
    })
// update user info
    usersRouter.patch("/me", requireUser, async (req, res, next) =>{
        const userId = req.user.id
        const fields = req.body
        const updatedObj = {
            username:fields.username,
            password:feilds.password,
            email:fields.email
        }
        const updatedUser = await updateUser(userId, updatedObj)
        if (req.user.id === updatedUser.id){
            res.send(updateUser)
        } else {
            next({
                error:"NotAuthorizedUser",
                message: "You are not authorized to update user"
            })
        }
    })

// user login
    usersRouter.post("/login", async (req, res, next) => {
       
        const {username, password} = req.body
        if(!username || !password){
            next ({
                error:"MissingCredentialsError",
                message:"Please supply both a username and a password"
            })
        }
        try {
            console.log("Attempting to log in...")
            const user = await getUser({username, password})

           
            if (user){
                try{

                const token = jwt.sign({id: user.id, username},`${process.env.JWT_SECRET}` )
               
                console.log("token:", token)
                res.send({message:"You are logged in!", token, user})
                } catch(error){
                    console.log("Token generation error: ", error)
                    next(error)
                }
            } else {
                next({
                    error:"IncorrectCredentialsError",
                    message: "Username or password is incorrect"
                })
            }
        } catch(error){
            console.log("Failed to log in...")
            next(error)
        }
    })

    // register new user

    usersRouter.post("/register", async (req, res, next) => {
        const {username, password, email} = req.body
        if (!username || !password || !email){
            next({
                name:"IncompleteFieldsError",
                message: "Please supply username, password, and email"
            })
        }
        if(password.length < 8){
            next({
                name:"PasswordLengthError",
                message:"Password too short!"
            })
        }
        try {
            const _user = await getUserByUsername(username)
            const _email = await getUserByEmail(email)
            if (_user || _email){
                next({
                    name:"UserAlreadyExists",
                    message:`${username} or ${email} is already in use`
                })
            } else {
                const user = await createUser({username, password, email})
                const token = jwt.sign({id:user.id, username},`${process.env.JWT_SECRET}`, {expiresIn: "2w"})
                res.send({message: "Thank you for signing up! Please login.", token, user })
            }
        } catch(error){
            console.error(error)
            next(error)
        }
    })

























    



    module.exports = usersRouter