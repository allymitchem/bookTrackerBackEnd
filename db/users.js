const client = require("./client")
const bcrypt = require("bcrypt")

async function createUser({username, password, email}){
    const SALT_COUNT = 12
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

    try {
        const {
            rows: [user]
        } = await client.query(
            `
            INSERT INTO users(username, password, email)
            VALUES ($1, $2, $3)
            RETURNING *
            `, [username, hashedPassword, email]
        )

        delete user.password
        return user
    } catch (error){
        console.error()
    }
}

async function getAllUsers(){
    try{
        const {rows} = await client.query (`
        SELECT username, email
        FROM users;
        `)
        return rows;
    } catch (error){
        console.error
    }
}

module.exports = {
    createUser,
    getAllUsers
}