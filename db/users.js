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

// ----may need to add hashing, for some reason bcrypt was giving issues initially

    // const allowedFields = [ "username", "password", "email"]
    // const updatedFields = {}
    // // const SALT_COUNT = 12;

    // for (const field of allowedFields){
    //     if (fields[field]){
    //         if (field === "password"){
    //             const hashedPassword = await bcrypt.hash(fields[field], SALT_COUNT)
    //             updatedFields[field] = hashedPassword;
    //         } else {
    //             updatedFields[field]= fields[field]
    //         }
    //     }
    // }

    // // const updatedFields = {
    // //     username: fields.username,
    // //     password: hashedPassword,
    // //     email: fields.email
    // // }

    // const setString = Object.keys(updatedFields).map((key, index) => `"${key}" =$${index + 1}`).join(", ");
    // if (setString.length === 0){
    //     // returns early if called without fields
    //     return null;
    // } 
    // try {
    //     const {
    //         rows:[user]
    //     } = await client.query (`
    //     UPDATE users
    //     SET ${setString}
    //     WHERE id = ${id}
    //     RETURNING *;
    //     ` , Object.values(updatedFields))
    //     delete user.password
    //     return user
    // } catch (error){
    //     throw error
    // }


}

module.exports = {
    createUser,
    getAllUsers,
    updateUser
}