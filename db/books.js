const client = require('./client');

/*

FUTURE FUNCTIONS

RETRIEVE BOOKS BEING PUBLISHED IN CURRENT MONTH FOR A TICKER

*/

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

async function getBooksByAuthor(authorName) {
    try {
        const {rows: books} = await client.query(`
        SELECT * FROM books
        WHERE author = $1;
        `,[authorName])
        return books
    } catch (error) {
        console.log(error)
    }
}

async function getBookByTitle(title) {
    try {
        const {rows: [books]} = await client.query(`
        SELECT * FROM books
        WHERE title = $1;
        `,[title])
        return books
    } catch (error) {
        console.log(error)
    }
}

async function getBookById(id) {
    try {
        const {rows: [book]} = await client.query(`
        SELECT * FROM books
        WHERE id = $1;
        `,[id])
        return book
    } catch (error) {
        console.log(error)
    }
}

async function deleteBook(id) {
    try {
        const {rows: [book]} = await client.query(`
            DELETE FROM books
            WHERE id = $1
            RETURNING *
        ;`, [id])
        return book
    } catch (error) {
        console.error(error)
    }
}

async function getAllBooks() {
    try {
        const {rows: books} = await client.query(`
            SELECT * 
            FROM books
        ;`)
        return books

    } catch (error) {
        console.error(error)
    }
}

async function updateBook({id, ...fields}) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    try {
        const {rows: [book]} = await client.query(`
        UPDATE books
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields));
        return book
    } catch (error) {
        console.error(error)        
    } 
}






module.exports = {
    addBook,
    getBooksByAuthor,
    getBookByTitle,
    updateBook,
    getBookById, 
    deleteBook,
    getAllBooks
};