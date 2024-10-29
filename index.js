const express = require("express")
const app = express()

const { initializeDatabase } = require("./db/db.connect")

const Book = require("./models.js/books.models")

app.use(express.json())

initializeDatabase()

const newBook = {
    title: "Lean In",
    author: "Sheryl Sandberg",
    publishedYear: 2012,
    genre: ["Non-Fiction", "Business"],
    language: "English",
    country: "United States",
    rating: 4.1,
    summary: "A book about empowering women in the workplace and achieving leadership roles.",
    coverImageUrl: "https://example.com/lean_in.jpg"
  };


  const newBookData = {
    "title": "Shoe Dog",
    "author": "Phil Knight",
    "publishedYear": 2016,
    "genre": ["Autobiography", "Business"],
    "language": "English",
    "country": "United States",
    "rating": 4.5,
    "summary": "An inspiring memoir by the co-founder of Nike, detailing the journey of building a global athletic brand.",
    "coverImageUrl": "https://example.com/shoe_dog.jpg"
  };
  


  async function createBook(newBook) {
    try{
        const book = new Book(newBook)
        const saveBook = await book.save()
        console.log(saveBook)

    }
    catch(error){
        console.log(error)
    }
  }

  app.post("/books", async(req, res)=> {                                                      //(1)
    try{
        const savedBook = await createBook(req.body)
        res.status(201).json({message: "Book Added Successfully.", book: savedBook})
         }
    catch(error){
        res.status(500).json({error: "Failed to add book."})
    }
 }) 

 async function createBookData(newBookData){
    try{
        const book = new Book(newBookData)
        const saveBook = await book.save()
        return saveBook

    }
    catch(error){
        console.log(error)
    }
 }
   
 app.post("/books2", async(req, res)=> {                                                    //(2)
    try{
        const savedBook = await createBookData(req.body)
        res.status(201).json({message: "Book Added Successfully.", book: savedBook})

    }
    catch(error){
        res.status(500).json({error: "failed to add book."})
    }
 })

 async function getAllBooks(){
    try{
        const allBooks = await Book.find()
        return allBooks

    }catch(error){
        console.log(error)
    }
 }

 app.get("/books", async(req, res)=> {                                                     //(3)
    try{
        const books = await getAllBooks()
        if(books.length != 0) {
            res.json(books)
        } else {
            res.status(404).json({error: "Book not found."})
        }

    }
    catch(error){
        res.status(500).json({error: "Failed to fetch books."})
    }
 })

 async function readBookByTitle(bookTitle){
    try{
        const bookByTitle = await Book.findOne({title: bookTitle})
        return bookByTitle

    }catch(error){
        console.log(error)
    }
 }

 app.get("/books/:bookTitle", async(req, res)=> {                                            //(4)
    try{
        const book = await readBookByTitle(req.params.bookTitle)
        if(book){
            res.json(book)
            
        }else {
            res.status(404).json({error: "Book not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to fetch book title."})
    }
 })

 async function readBookByAuthor(authorName){
    try{
        const bookByAuthor = await Book.findOne({author: authorName})
        return bookByAuthor

    }catch(error){
        console.log(error)
    }
 }

 app.get("/books/author/:authorName", async(req, res)=> {                             //(5)
    try{
        const book = await readBookByAuthor(req.params.authorName)
       
        if(book){
            res.json(book)
        } else {
            res.status(404).json({error: "Book not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to fetch book by author."})
    }
 })

 async function readAllBookGenreBusiness(bookGenre) {
    try{
        const bookByGenre = await Book.find({genre: bookGenre})
        return bookByGenre

    }catch(error){
        console.log(error)
    }
 }

 app.get("/books/genre/:bookGenre", async(req, res)=> {                                  //(6)
    try{
        const book = await readAllBookGenreBusiness(req.params.bookGenre)
        if(book.length != 0) {
            res.json(book)
        } else {
            res.status(404).json({error: "Book not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to fetch book by genre."})
    }
 })

 async function readBookByReleaseYear(bookReleaseYear) {
    try{
        const releaseYear = await Book.find({publishedYear: bookReleaseYear})
        return releaseYear

    }catch(error){
        console.log(error)
    }
 }

 app.get("/books/publishedYear/:bookPublishYear", async(req, res)=> {                          //(7)
    try{
        const book = await readBookByReleaseYear(req.params.bookPublishYear)
        if(book.length !=0) {
            res.json(book)
        } else {
            res.status(404).json({error: "Book not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to fetch book."})
    }
 })

 async function updateBook(bookId, dataToUpdate) {
    try{
        const updateBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return updateBook

    }catch(error){
        console.log(error)
    }
 }

 app.post("/books/:bookId",async(req, res)=> {                                 //(8)
    try{
        const updatedBook = await updateBook(req.params.bookId, req.body)
        if(updatedBook) {
            res.status(200).json({message: "Book Updated successfully.", book: updatedBook})
        } else {
            res.status(404).json({error: "Book does not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to update book rating."})
    }
 })

 async function updateBookByTitle(bookTitle, dataToUpdate){
    try{
        const updateBook = await Book.findOneAndUpdate({title: bookTitle}, dataToUpdate, {new: true})
        return updateBook

    }catch(error){
        console.log(error)
    }
 }

 app.post("/books/title/:bookTitle", async(req, res)=> {                                       //(9)
    try{
        const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body)
        if(updatedBook) {
            res.status(200).json({message: "Book Updated successfully.", book: updatedBook})
        } else {
            res.status(404).json({error: "Book does not found."})
        }

    }catch(error){
        res.status(500).json({error: "Failed to update book rating."})
    }
 })


 async function deleteBook(bookId){
    try{
        const deletedBook = await Book.findByIdAndDelete(bookId)
        return deletedBook

    }catch(error){
        console.log(error)
    }
 }

 app.delete("/books/:bookId", async(req, res)=> {                                        //(10)
    try{
        const deletedBook = await deleteBook(req.params.bookId)

        if(deletedBook){
            res.status(200).json({message: "Book Deleted Successfully."})
        }

    }catch(error){
        res.status(500).json({error: "failed to delete book."})
    }
 })





 const PORT = 3000;
 app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
 })
