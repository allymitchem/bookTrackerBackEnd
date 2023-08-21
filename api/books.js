const express = require("express")
const booksRouter = express.Router()
const {requireUser} = require("./utils")

const { getAllBooks, getBookById, updateBook, addBook, deleteBook } = require('../db')

booksRouter.get("", async (req, res, next) => {
    try {
      const bookList= await getAllBooks()
      res.send(bookList)
    } catch (error) {
        throw(error)     
    }    
  })

  booksRouter.get("/:bookId", async (req, res, next) => {
    
    try {
        const { bookId } = req.params
        const book = await getBookById(bookId)
        if(!book) {
            next({
                name: "Book Not Found",
                message: `A book with id ${bookId} not found.`
            })
        } else {
            res.send(book)
        }        
    } catch ({error, name, message}) {
        next({error, name, message})
    }
})




  module.exports = booksRouter