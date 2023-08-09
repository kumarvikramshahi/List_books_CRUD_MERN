const BookSchema = require("../schemas/book");
const { ThrowError } = require("../Error/error")

exports.getAllBooks = (req, res, next) => {
    BookSchema.find()
        .then(data => {
            if (!data.length) ThrowError(`Unable to fetch books`, 404);
            res.status(200).json({ data: data });
        })
        .catch(err => next(err))
}

exports.fetchBookById = (req, res, next) => {
    const bid = req.params.id;

    BookSchema.findById(bid)
        .then((book) => {
            if (!book) {
                return res.status(404).json({ error: 'Book of given ID not found' });
            }

            console.log('Fetched book:', book);
            return res.json(book);
        })
        .catch((err) => {
            next(err)
        });
}

exports.addBook = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;

    console.log(req.body)

    const newBook = new BookSchema({
        title: title,
        author: author,
        genre: genre
    })
    newBook.save().then(data => res.json({ message: data })).catch(err => next(err))
}

exports.editBook = async (req, res, next) => {
    const bid = req.body.id
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;

    try {
        const result = await BookSchema.updateOne({ _id: bid }, {
            $set: {
                ...(title && { title: title }),
                ...(author && { author: author }),
                ...(genre && { genre: genre })
            }
        })
        if (!(result.matchedCount)) ThrowError("book _id not found", 404)
        res.status(200).json({
            message: 'Updated successfully'
        })
    }
    catch (err) {
        next(err)
    }
}

exports.deleteBook = (req, res, next) => {
    const bid = req.params.id;

    BookSchema.findByIdAndDelete(bid)
        .then((deletedBook) => {
            if (!deletedBook) {
                return res.status(404).json({ error: 'Book with given ID not found' });
            }

            console.log('Deleted book:', deletedBook);
            return res.json(deletedBook);
        })
        .catch((err) => {
            next(err)
        });
}