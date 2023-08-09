const router = require('express').Router();
const { getAllBooks, editBook, deleteBook, addBook, fetchBookById } = require("../controllers/booksLogics")

router.get('/books',
    getAllBooks
);
router.get("/books/:id", fetchBookById);
router.post('/books', addBook);
router.patch("/books", editBook);
router.delete("/books/:id", deleteBook);

module.exports = router;