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

async function updateUser ({id, ...fields}){
    const SALT_COUNT = 12
    const updatedPassword = await bcrypt.hash("newpassword", SALT_COUNT)
 
    fields.password = updatedPassword

    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ")

try {
    const {
        rows: [user]
    } = await client.query(
        `
    UPDATE users
    SET ${setString}
    WHERE id=${id}
    RETURNING *        
    `,
        Object.values(fields)
    )
    delete user.password
    return user
} catch (error) {
    console.error()
}

}

async function deleteUser(userId){
    try{
        const {
            rows: [user]
        } = await client.query(`
        DELETE FROM users
        WHERE id =$1
        RETURNING username, email
        `, [userId])
        return user
    } catch (error){
        console.error()
    }
}

async function getUserByUsername(username){
    try{
        const {
            rows: [user]
        } = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1;
        `, [username])
        return user
    } catch(error){
        console.error()
    }
}

async function getUserById(id){
    try{
        const {
            rows: [user]
        } = await client.query(`
        SELECT *
        FROM users
        WHERE id = $1;
        `, [id])
        return user
    } catch(error){
        console.error()
    }
}

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByUsername, 
    getUserById
}