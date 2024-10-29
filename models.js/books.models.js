const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: String,
        required: true
    },
    genre: [{
        type: String,
        enum: ["Autobiography","Fiction","Business", "Non-Fiction", "Mystery", "Thriller", "Science Fiction", "Fantasy", "Romance", "Historical", "Biography", "Self-Help", "Other"],
        required: true
    }],
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "United States"
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    summary: {
        type: String
    },
    coverImageIrl: {
        type: String
    },
},
{
    timestamps: true
}
)

const Book = mongoose.model("Book", bookSchema)

module.exports = Book;