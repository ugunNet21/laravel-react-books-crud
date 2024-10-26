import React, {
    useEffect,
    useState,
} from "react";

import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/books');
            console.log("Fetched books:", response.data);
            if (Array.isArray(response.data)) {
                setBooks(response.data);
            } else {
                console.error("Expected an array but received:", response.data);
                setBooks([]);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]); // Reset to empty array on error
        }
    };

    const addBook = async () => {
        try {
            await axios.post('/api/books', { title, author, description });
            fetchBooks();
            setTitle('');
            setAuthor('');
            setDescription('');
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <div>
            <h1>Book List</h1>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button onClick={addBook}>Add Book</button>

            <ul>
                {books.map(book => (
                    <li key={book.id}>{book.title} by {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
