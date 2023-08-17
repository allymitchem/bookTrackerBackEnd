const client = require("./client")
const { createUser, getAllUsers, updateUser} = require("./")

async function dropTables(){
    try{
        console.log("Dropping all tables...")
        await client.query(`
        DROP TABLE IF EXISTS users;
        `)
        console.log("Finished dropping all tables...")
    } catch (error){
        throw error
    }
}


async function createTables(){
    try{
        console.log("Starting to build tables...")

        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(300) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            "tbrBooks" INTEGER[],
            "currentlyReadingBooks" INTEGER[],
            "readBooks" INTEGER[],
            "dnfBooks" INTEGER[]

        );
        `)

        console.log("Finished building tables...")
    }catch(error){
        console.log("Error building tables...")
        throw error
    }
}

async function createInitialUsers(){
    console.log("Starting to create initial users...")
    try{
        const Allyson = await createUser({
            username: "Allyson",
            password: "testing123",
            email: "ilikeshadows@gmail.com"
        })
        console.log("Finished creating initial user...")
    }catch(error){
        console.error()
    }
}

async function rebuildDB(){
    try{
        await dropTables()
        await createTables()
        await createInitialUsers()
    }catch (error){
        console.error(error)
        throw error
    }
}

const updatedUserInfo = {
    id: 1,
    username:"ally",
    password: "whyamilikethis",
    email: "booksbooksbooks@books.com"
}

async function testDB(){
    console.log("Starting to test database...")

    const userCreated = await createUser({
        username: "Meadows",
        password:"littlemouse",
        email:"morallyblack@gmail.com"
    })
    console.log("User created: ", userCreated)
   
    const allUsers = await getAllUsers()
    console.log("All users: ", allUsers)
    
    const updatedUser = await updateUser( updatedUserInfo )
    console.log("Updated user: ", updatedUser)


}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => {
        client.end()
    })