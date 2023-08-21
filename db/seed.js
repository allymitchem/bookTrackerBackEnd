const client = require("./client")

async function dropTables(){
    try{
        console.log("Dropping all tables...")
        await client.query(`

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

        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            "imageURL" VARCHAR(255),
            genre VARCHAR(255) NOT NULL,
            CONSTRAINT chk_genre CHECK (genre IN ('fantasy', 'mystery', 'classics', 'romance', 'youngAdult', 'non-fiction', 'fiction'))
        );
        `)

        console.log("Finished building tables...")
    }catch(error){
        console.log("Error building tables...")
        throw error
    }
}


async function rebuildDB(){
    try{
        await dropTables()
        await createTables()
    }catch (error){
        console.error(error)
        throw error
    }
}

async function testDB(){
    console.log("Starting to test database...")

   


}

rebuildDB()
.catch(console.error)
    .finally(() => {
        client.end()
    })