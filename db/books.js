const client = require('./client');

async function addBook({title, author, imageURL, genre}) {
    try {
        const {rows: [book]} = await client.query(`
            INSERT INTO books(title, author, "imageURL", genre)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [title, author, imageURL, genre])
        return book
    } catch (error) {
        console.error(error)
    }
}






module.exports = {
    addBook
};